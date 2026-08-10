'use server';

import {EndSessionResult, StartSessionResult} from "@/types";
import {connectToDatabase} from "@/database/mongoose";
import VoiceSession from "@/database/models/book-session.model";
import { actionRateLimit } from "@/lib/rate-limit";
import { EndVoiceSessionSchema, StartVoiceSessionSchema } from "@/lib/zod";

const RATE_LIMITED_ERROR = 'Too many requests. Please try again later.';

export const startVoiceSession = async (clerkId: string, bookId: string): Promise<StartSessionResult> => {
    try {
        const parsedInput = StartVoiceSessionSchema.safeParse({ clerkId, bookId });

        if (!parsedInput.success) {
            return { success: false, error: 'Invalid session request' };
        }

        const { clerkId: validClerkId, bookId: validBookId } = parsedInput.data;

        await connectToDatabase();

        const rateLimit = await actionRateLimit({
            tier: 'authed',
            identifier: validClerkId,
        });

        if (rateLimit.limited) {
            return { success: false, error: RATE_LIMITED_ERROR };
        }

        // Limits/Plan to see whether a session is allowed.
        const { getUserPlan } = await import("@/lib/subscription.server");
        const { PLAN_LIMITS, getCurrentBillingPeriodStart } = await import("@/lib/subscription-constants");

        const plan = await getUserPlan();
        const limits = PLAN_LIMITS[plan];
        const billingPeriodStart = getCurrentBillingPeriodStart();

        const sessionCount = await VoiceSession.countDocuments({
            clerkId: validClerkId,
            billingPeriodStart
        });

        if (sessionCount >= limits.maxSessionsPerMonth) {
            const { revalidatePath } = await import("next/cache");
            revalidatePath("/library");

            return {
                success: false,
                error: `You have reached the monthly session limit for your ${plan} plan (${limits.maxSessionsPerMonth}). Please upgrade for more sessions.`,
                isBillingError: true,
            };
        }

        const session = await VoiceSession.create({
            clerkId: validClerkId,
            bookId: validBookId,
            startedAt: new Date(),
            billingPeriodStart,
            durationSeconds: 0,
        });

        return {
            success: true,
            sessionId: session._id.toString(),
            maxDurationMinutes: limits.maxDurationPerSession,
        }
    } catch (e) {
        console.error('Error starting voice session', e);
        return { success: false, error: 'Failed to start voice session. Please try again later.' }
    }
}

export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {
    try {
        const parsedInput = EndVoiceSessionSchema.safeParse({ sessionId, durationSeconds });

        if (!parsedInput.success) {
            return { success: false, error: 'Invalid session data' };
        }

        await connectToDatabase();

        const rateLimit = await actionRateLimit({ tier: 'authed' });

        if (rateLimit.limited) {
            return { success: false, error: RATE_LIMITED_ERROR };
        }

        const result = await VoiceSession.findByIdAndUpdate(parsedInput.data.sessionId, {
            endedAt: new Date(),
            durationSeconds: parsedInput.data.durationSeconds,
        });

        if(!result) return { success: false, error: 'Voice session not found.' }

        return { success: true }
    } catch (e) {
        console.error('Error ending voice session', e);
        return { success: false, error: 'Failed to end voice session. Please try again later.' }
    }
}
