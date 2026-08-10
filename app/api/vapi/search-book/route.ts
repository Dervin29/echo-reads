import { NextResponse } from 'next/server';

import { searchBookSegments } from '@/lib/actions/book.actions';
import { VapiSearchArgsSchema, VapiWebhookSchema } from '@/lib/zod';
import { routeRateLimit } from '@/lib/rate-limit';

// Helper function to process book search logic
async function processBookSearch(bookId: unknown, query: unknown) {
    const parsed = VapiSearchArgsSchema.safeParse({ bookId, query });

    if (!parsed.success) {
        return { result: 'Missing or invalid bookId or query' };
    }

    const { bookId: validBookId, query: validQuery } = parsed.data;

    // Execute search
    const searchResult = await searchBookSegments(validBookId, validQuery, 3);

    // Return results
    if (!searchResult.success || !searchResult.data?.length) {
        return { result: 'No information found about this topic in the book.' };
    }

    const combinedText = searchResult.data
        .map((segment) => (segment as { content: string }).content)
        .join('\n\n');

    return { result: combinedText };
}

export async function GET(request: Request) {
    const rateLimited = routeRateLimit({ tier: 'public', request });
    if (rateLimited) return rateLimited;

    return NextResponse.json({ status: 'ok' });
}

// Parse tool arguments that may arrive as a JSON string or an object
function parseArgs(args: unknown): Record<string, unknown> {
    if (!args) return {};
    if (typeof args === 'string') {
        try { return JSON.parse(args); } catch { return {}; }
    }
    return args as Record<string, unknown>;
}

export async function POST(request: Request) {
    try {
        const rateLimited = routeRateLimit({ tier: 'public', request });
        if (rateLimited) return rateLimited;

        const body = VapiWebhookSchema.safeParse(await request.json());

        if (!body.success) {
            return NextResponse.json(
                { results: [{ result: 'Malformed request payload' }] },
                { status: 400 },
            );
        }

        const { message } = body.data;

        // Support multiple Vapi formats
        const functionCall = message?.functionCall;
        const toolCallList = message?.toolCallList || message?.toolCalls;

        // Handle single functionCall format
        if (functionCall) {
            const { name, parameters } = functionCall;
            const parsed = parseArgs(parameters);

            if (name === 'searchBook') {
                const result = await processBookSearch(parsed.bookId, parsed.query);
                return NextResponse.json(result);
            }

            return NextResponse.json({ result: `Unknown function: ${name}` });
        }

        // Handle toolCallList format (array of calls)
        if (!toolCallList || toolCallList.length === 0) {
            return NextResponse.json({
                results: [{ result: 'No tool calls found' }],
            });
        }

        const results = [];

        for (const toolCall of toolCallList) {
            const { id, function: func } = toolCall;
            const name = func?.name;
            const args = parseArgs(func?.arguments);

            if (name === 'searchBook') {
                const searchResult = await processBookSearch(args.bookId, args.query);
                results.push({ toolCallId: id, ...searchResult });
            } else {
                results.push({ toolCallId: id, result: `Unknown function: ${name}` });
            }
        }

        return NextResponse.json({ results });
    } catch (error) {
        console.error('Vapi search-book error:', error);
        return NextResponse.json({
            results: [{ result: 'Error processing request' }],
        });
    }
}