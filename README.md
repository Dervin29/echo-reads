# Echo Reads

Turn your books into interactive AI conversations. Upload a PDF, then discuss the book through AI-powered voice chat.

## Demo

[Live App](https://echo-reads-ten.vercel.app)

## Features

* Upload book PDFs up to 50 MB with custom or automatically generated covers
* AI-powered voice conversations about uploaded books
* Five ElevenLabs voice options
* Live conversation transcripts
* Search book content during conversations
* Personal library with book search
* Free, Standard, and Pro usage plans

## Tech Stack

| Layer              | Technologies                                                                |
| ------------------ | --------------------------------------------------------------------------- |
| **Frontend**       | Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion |
| **Backend**        | Next.js Server Actions, Route Handlers, Zod                                 |
| **Database**       | MongoDB, Mongoose                                                           |
| **Authentication** | Clerk                                                                       |
| **Storage**        | Vercel Blob                                                                 |
| **Voice AI**       | Vapi, ElevenLabs                                                            |
| **PDF Processing** | pdfjs-dist                                                                  |
| **Deployment**     | Vercel                                                                      |

## Project Structure

```text
echo-reads/
├── app/
│   ├── (root)/
│   │   ├── books/
│   │   │   ├── new/
│   │   │   └── [slug]/
│   │   ├── library/
│   │   └── subscriptions/
│   └── api/
│       ├── upload/
│       └── vapi/
│           └── search-book/
│
├── components/
│   ├── design/
│   ├── landing/
│   ├── library/
│   ├── pricing/
│   └── ui/
│
├── database/
│   └── models/
│
├── hooks/
│
├── lib/
│   └── actions/
│
├── public/
├── .env.example
├── package.json
└── README.md
```

### Directory Overview

| Directory     | Purpose                                      |
| ------------- | -------------------------------------------- |
| `app/`        | Application routes, pages, and API endpoints |
| `components/` | Reusable UI and feature-specific components  |
| `database/`   | MongoDB connection and data models           |
| `hooks/`      | Custom React hooks                           |
| `lib/`        | Server actions and shared application logic  |
| `public/`     | Static assets                                |

## Getting Started

### Prerequisites

* Node.js
* MongoDB
* Clerk
* Vercel Blob
* Vapi

### Installation

```bash
git clone https://github.com/Dervin29/echo-reads.git
cd echo-reads
npm install
```

### Environment Variables

Create `.env.local` using `.env.example` as a reference.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MONGODB_URI=
BLOB_READ_WRITE_TOKEN=
NEXT_PUBLIC_ASSISTANT_ID=
NEXT_PUBLIC_VAPI_API_KEY=
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## How It Works

1. Users authenticate through Clerk.
2. A book PDF is uploaded and processed into text.
3. The file is stored in Vercel Blob, while book data and text segments are stored in MongoDB.
4. Users open a book and start a voice conversation.
5. Vapi manages the voice interaction and ElevenLabs provides the selected voice.
6. The AI can search the book's stored content when additional context is needed.
7. Conversation sessions and usage are tracked against subscription limits.

## Security

* Server-side authentication and ownership checks with Clerk
* Zod validation for server actions and API routes
* Server-enforced file type and size limits
* Per-IP and per-user rate limiting
* Regex escaping for search queries
* Environment-based secret management

## Known Limitations

* Rate limiting is currently in-memory and scoped to individual serverless instances
* Server-side magic-byte validation is not implemented yet
* Uploaded files are accessible through their Vercel Blob URLs
* Voice functionality depends on Vapi and ElevenLabs

## Future Improvements

* Server-side magic-byte validation
* Redis-backed rate limiting
* In-app PDF reader
* Text-to-speech playback
* Mobile application

## Author

**Alan Derwin A**

[GitHub](https://github.com/Dervin29)
