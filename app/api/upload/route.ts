import { MAX_FILE_SIZE } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";
import { handleUpload, HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { routeRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const rateLimited = routeRateLimit({
      tier: "authed",
      request,
      identifier: userId,
    });

    if (rateLimited) {
      return rateLimited;
    }

    const body = (await request.json()) as HandleUploadBody;
    const jsonResponse = await handleUpload({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/webp",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: MAX_FILE_SIZE,
          tokenPayload: JSON.stringify({
            userId,
          }),
        };
      },

      onUploadCompleted: async ({ blob }) => {
        console.log("file uploaded to blob", blob.url);
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    const status = message.includes("Unauthorized") ? 401 : error instanceof SyntaxError || message.includes("Unexpected token") || message.includes("JSON") || message.includes("Malformed") ? 400 : 500;
    return NextResponse.json({ message }, { status });
  }
}
