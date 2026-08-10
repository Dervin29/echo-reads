import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_PDF_TYPES, MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES } from "./constants";

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

export const ObjectIdSchema = z
  .string({ message: "Invalid id" })
  .regex(OBJECT_ID_REGEX, { message: "Invalid id" });

export const TitleSchema = z
  .string({ message: "Title is required" })
  .trim()
  .min(1, { message: "Title is required" })
  .max(200, { message: "Title is too long" });

export const AuthorSchema = z
  .string({ message: "Author name is required" })
  .trim()
  .min(1, { message: "Author name is required" })
  .max(200, { message: "Author name is too long" });

export const SlugSchema = z
  .string({ message: "Invalid slug" })
  .trim()
  .min(1, { message: "Invalid slug" })
  .max(300, { message: "Slug is too long" });

export const SearchQuerySchema = z
  .string({ message: "Invalid search query" })
  .trim()
  .min(1, { message: "Invalid search query" })
  .max(500, { message: "Search query is too long" });

export const ClerkIdSchema = z
  .string({ message: "Invalid user id" })
  .min(1, { message: "Invalid user id" })
  .max(200, { message: "Invalid user id" });

export const GetAllBooksSchema = z.object({
  search: SearchQuerySchema.optional(),
});

export const CheckBookExistsSchema = z.object({
  title: TitleSchema,
});

export const CreateBookSchema = z.object({
  clerkId: ClerkIdSchema,
  title: TitleSchema,
  author: AuthorSchema,
  persona: z.string().max(100).optional(),
  fileURL: z.string().url({ message: "Invalid file URL" }).max(1000),
  fileBlobKey: z.string().min(1).max(1000),
  coverURL: z.string().url({ message: "Invalid cover URL" }).max(1000).optional(),
  coverBlobKey: z.string().min(1).max(1000).optional(),
  fileSize: z.number().int().min(0).max(MAX_FILE_SIZE),
});

export const TextSegmentSchema = z.object({
  text: z.string().min(1).max(100000),
  segmentIndex: z.number().int().min(0),
  pageNumber: z.number().int().min(1).optional(),
  wordCount: z.number().int().min(0),
});

export const SaveBookSegmentsSchema = z.object({
  bookId: ObjectIdSchema,
  clerkId: ClerkIdSchema,
  segments: z.array(TextSegmentSchema).min(1).max(5000),
});

export const GetBookBySlugSchema = z.object({
  slug: SlugSchema,
});

export const DeleteBookSchema = z.object({
  bookId: ObjectIdSchema,
});

export const SearchBookSegmentsSchema = z.object({
  bookId: ObjectIdSchema,
  query: SearchQuerySchema,
  limit: z.number().int().min(1).max(20).optional(),
});

export const StartVoiceSessionSchema = z.object({
  clerkId: ClerkIdSchema,
  bookId: ObjectIdSchema,
});

export const EndVoiceSessionSchema = z.object({
  sessionId: ObjectIdSchema,
  durationSeconds: z.number().int().min(0).max(86400),
});

export const VapiSearchArgsSchema = z.object({
  bookId: ObjectIdSchema,
  query: SearchQuerySchema,
});

export const VapiFunctionCallSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  parameters: z.unknown().optional(),
});

export const VapiToolCallSchema = z.object({
  id: z.string().min(1).max(200).optional(),
  function: z
    .object({
      name: z.string().min(1).max(100).optional(),
      arguments: z.unknown().optional(),
    })
    .optional(),
});

export const VapiWebhookSchema = z
  .object({
    message: z
      .object({
        functionCall: VapiFunctionCallSchema.optional(),
        toolCallList: z.array(VapiToolCallSchema).optional(),
        toolCalls: z.array(VapiToolCallSchema).optional(),
      })
      .optional(),
  })
  .passthrough();

export const UploadSchema = z.object({
  file: z
    .instanceof(File, { message: "Please upload a PDF file" })
    .refine((f) => f.size <= MAX_FILE_SIZE, { message: "Max file size is 50MB" })
    .refine((f) => ACCEPTED_PDF_TYPES.includes(f.type), {
      message: "Only PDF files are allowed",
    }),
  cover: z
    .union([
      z
        .instanceof(File)
        .refine((f) => f.size <= MAX_IMAGE_SIZE, {
          message: "Max image size is 10MB",
        })
        .refine((f) => ACCEPTED_IMAGE_TYPES.includes(f.type), {
          message: "Only JPEG, PNG, or WebP images are allowed",
        }),
      z.undefined(),
    ])
    .optional(),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author name is required"),
  voiceId: z.string().min(1, "Please select a voice"),
});
