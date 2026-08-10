# Echo Reads

Convert your books into interactive AI conversations. Upload a PDF, then discuss your favorite reads with AI-powered voice chat.

## Demo

Live app: [echo-reads-ten.vercel.app](https://echo-reads-ten.vercel.app)

## Features

- Upload book PDFs (up to 50 MB), with a custom cover or one auto-generated from the first page
- Talk about a book with AI voice chat, choosing from five ElevenLabs voices
- Live streaming transcript of the conversation
- In-conversation book search — the AI queries book content via keyword/text search
- Library with search across your books
- Free, Standard, and Pro plans with monthly book, session, and duration limits

## Tech Stack

```text
Frontend     Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, framer-motion
Backend      Next.js Server Actions & Route Handlers, Zod, Mongoose
Database     MongoDB
Auth         Clerk
Storage      Vercel Blob
Voice AI     Vapi (AI voice calls) + ElevenLabs
PDF          pdfjs-dist
```

## Getting Started

Prerequisites: Node.js, a MongoDB database, and API keys for Clerk, Vercel Blob, and Vapi.

```bash
git clone https://github.com/Dervin29/echo-reads.git
cd echo-reads
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a `.env.local` (see `.env.example`):

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `MONGODB_URI` | MongoDB connection string |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token |
| `NEXT_PUBLIC_ASSISTANT_ID` | Vapi assistant ID |
| `NEXT_PUBLIC_VAPI_API_KEY` | Vapi public API key |

Rate limit thresholds are configurable via optional `RATE_LIMIT_*` variables (defaults in `.env.example`).

## Project Structure

```text
app/          # Pages (landing, library, book detail, pricing) and API routes (upload, Vapi webhook)
components/   # UI: upload form, library grid, voice controls, pricing, landing sections
database/     # Mongoose models and connection
lib/          # Server actions, Zod schemas, rate limiting, subscription logic, utilities
hooks/        # useVapi (voice call lifecycle), useSubscription
```

## How It Works

1. User signs in with Clerk.
2. Upload a PDF with title/author; the PDF is parsed into text segments and a cover image is generated from the first page.
3. The file is stored on Vercel Blob; the book record and text segments are stored in MongoDB.
4. Open a book and start a voice session with the chosen voice.
5. The AI discusses the book and can search its content on demand via a tool call (MongoDB text search with regex fallback).
6. Sessions are tracked against the plan's monthly limits; the live transcript streams during the call.

## Security

- Clerk authentication with server-side authorization (ownership checks on book queries and deletes)
- Strict Zod validation on all server-action inputs and API routes (file type/size, titles, IDs, webhook payloads)
- Upload safety: server-enforced content-type whitelist (PDF/JPEG/PNG/WebP) and 50 MB size limit via Vercel Blob tokens; files stored on external blob storage and never executed
- Configurable rate limiting: strict per-IP + per-account limits with exponential backoff for auth, moderate per-IP limits for public endpoints, looser per-user limits for authenticated actions
- Regex escaping on search input to prevent ReDoS
- No secrets in the repo — all configuration is environment-based

## Known Limitations

- Rate-limit counters are in-memory, so they apply per serverless instance rather than globally; a shared store (e.g. Upstash Redis) is needed at scale
- Uploaded file content is validated by client-side PDF parsing; the server enforces type and size but does not sniff file bytes
- Uploaded files are publicly accessible via their blob URLs
- Voice quality depends on external Vapi/ElevenLabs services

## Future Improvements

- Server-side magic-byte validation of uploads
- Shared (Redis-backed) rate limiting
- In-app PDF reader
- Text-to-speech playback of book segments
- Mobile app

## Author

Alan Derwin A

- GitHub: [github.com/Dervin29](https://github.com/Dervin29)
