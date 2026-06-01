# Echo Reads

Convert your books into interactive AI conversations. Upload a PDF, and discuss your favorite reads with AI-powered voice chat.

## Features

- **PDF Upload** — Upload books (up to 50 MB), auto-generate covers or upload custom ones
- **AI Voice Chat** — Real-time voice conversations with AI using ElevenLabs voices
- **Live Transcript** — Streaming transcript of your conversation
- **Book Search** — AI can search book content via keyword lookup during conversations
- **Subscription Tiers** — Free, Standard, and Pro plans with book/session limits

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Authentication:** Clerk
- **Database:** MongoDB / Mongoose
- **File Storage:** Vercel Blob
- **Voice AI:** Vapi.ai + ElevenLabs
- **PDF Parsing:** pdfjs-dist

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `MONGODB_URI` | MongoDB connection string |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token |
| `NEXT_PUBLIC_ASSISTANT_ID` | Vapi assistant ID |
| `NEXT_PUBLIC_VAPI_API_KEY` | Vapi public key |

## Deploy

Deploy on [Vercel](https://vercel.com). The live app is at [echo-reads-ten.vercel.app](https://echo-reads-ten.vercel.app/).
