import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_PDF_TYPES, MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES } from "./constants";

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
