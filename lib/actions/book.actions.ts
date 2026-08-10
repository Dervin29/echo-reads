"use server";

import { CreateBook, TextSegment } from "@/types";
import { connectToDatabase } from "@/database/mongoose";
import { escapeRegex, generateSlug, serializeData } from "@/lib/utils";
import Book from "@/database/models/book.model";
import mongoose from "mongoose";
import { getUserPlan } from "@/lib/subscription.server";
import BookSegment from "@/database/models/book-segment.models";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { actionRateLimit } from "@/lib/rate-limit";
import {
  CheckBookExistsSchema,
  CreateBookSchema,
  DeleteBookSchema,
  GetAllBooksSchema,
  GetBookBySlugSchema,
  SaveBookSegmentsSchema,
  SearchBookSegmentsSchema,
} from "@/lib/zod";

const RATE_LIMITED_ERROR = "Too many requests. Please try again later.";

export const getAllBooks = async (search?: string) => {
  try {
    const parsedInput = GetAllBooksSchema.safeParse({ search });

    if (!parsedInput.success) {
      return { success: false, error: "Invalid search query" };
    }

    await connectToDatabase();

    const { userId } = await auth();

    const rateLimit = await actionRateLimit({
      tier: "authed",
      identifier: userId ?? undefined,
    });

    if (rateLimit.limited) {
      return { success: false, error: RATE_LIMITED_ERROR };
    }

    const query: Record<string, unknown> = { clerkId: userId };

    if (parsedInput.data.search) {
      const escapedSearch = escapeRegex(parsedInput.data.search);
      const regex = new RegExp(escapedSearch, "i");
      query.$or = [
        { title: { $regex: regex } },
        { author: { $regex: regex } },
      ];
    }

    const books = await Book.find(query).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: serializeData(books),
    };
  } catch (e) {
    console.error("Error connecting to database", e);
    return {
      success: false,
      error: (e as Error).message,
    };
  }
};

export const checkBookExists = async (title: string) => {
  try {
    const parsedInput = CheckBookExistsSchema.safeParse({ title });

    if (!parsedInput.success) {
      return { success: false, error: "Invalid title" };
    }

    await connectToDatabase();

    const rateLimit = await actionRateLimit({ tier: "authed" });

    if (rateLimit.limited) {
      return { success: false, error: RATE_LIMITED_ERROR };
    }

    const slug = generateSlug(parsedInput.data.title);

    const existingBook = await Book.findOne({ slug }).lean();

    if (existingBook) {
      return {
        exists: true,
        book: serializeData(existingBook),
      };
    }

    return {
      exists: false,
    };
  } catch (e) {
    console.error("Error checking book exists", e);
    return {
      exists: false,
      error: (e as Error).message,
    };
  }
};

export const createBook = async (data: CreateBook) => {
  try {
    const parsedInput = CreateBookSchema.safeParse(data);

    if (!parsedInput.success) {
      return { success: false, error: "Invalid book data" };
    }

    const validData = parsedInput.data;

    await connectToDatabase();

    const slug = generateSlug(validData.title);

    const existingBook = await Book.findOne({ slug }).lean();

    if (existingBook) {
      return {
        success: true,
        data: serializeData(existingBook),
        alreadyExists: true,
      };
    }

    const { PLAN_LIMITS } = await import("@/lib/subscription-constants");

    const { auth } = await import("@clerk/nextjs/server");
    const { userId } = await auth();

    if (!userId || userId !== validData.clerkId) {
      return { success: false, error: "Unauthorized" };
    }

    const rateLimit = await actionRateLimit({
      tier: "authed",
      identifier: userId,
    });

    if (rateLimit.limited) {
      return { success: false, error: RATE_LIMITED_ERROR };
    }

    const plan = await getUserPlan();
    const limits = PLAN_LIMITS[plan];

    const bookCount = await Book.countDocuments({ clerkId: userId });

    if (bookCount >= limits.maxBooks) {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/library");

      return {
        success: false,
        error: `You have reached the maximum number of books allowed for your ${plan} plan (${limits.maxBooks}). Please upgrade to add more books.`,
        isBillingError: true,
      };
    }

    const book = await Book.create({
      ...validData,
      clerkId: userId,
      slug,
      totalSegments: 0,
    });

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/library");

    return {
      success: true,
      data: serializeData(book),
    };
  } catch (e) {
    console.error("Error creating a book", e);

    return {
      success: false,
      error: (e as Error).message,
    };
  }
};

export const getBookBySlug = async (slug: string) => {
  try {
    const parsedInput = GetBookBySlugSchema.safeParse({ slug });

    if (!parsedInput.success) {
      return { success: false, error: "Book not found" };
    }

    await connectToDatabase();

    const rateLimit = await actionRateLimit({ tier: "authed" });

    if (rateLimit.limited) {
      return { success: false, error: RATE_LIMITED_ERROR };
    }

    const book = await Book.findOne({ slug: parsedInput.data.slug }).lean();

    if (!book) {
      return { success: false, error: "Book not found" };
    }

    return {
      success: true,
      data: serializeData(book),
    };
  } catch (e) {
    console.error("Error fetching book by slug", e);
    return {
      success: false,
      error: (e as Error).message,
    };
  }
};

export const saveBookSegments = async (
  bookId: string,
  clerkId: string,
  segments: TextSegment[],
) => {
  try {
    const parsedInput = SaveBookSegmentsSchema.safeParse({
      bookId,
      clerkId,
      segments,
    });

    if (!parsedInput.success) {
      return { success: false, error: "Invalid book segments" };
    }

    await connectToDatabase();

    const rateLimit = await actionRateLimit({
      tier: "authed",
      identifier: parsedInput.data.clerkId,
    });

    if (rateLimit.limited) {
      return { success: false, error: RATE_LIMITED_ERROR };
    }

    console.log("Saving book segments...");

    const segmentsToInsert = parsedInput.data.segments.map(
      ({ text, segmentIndex, pageNumber, wordCount }) => ({
        clerkId,
        bookId,
        content: text,
        segmentIndex,
        pageNumber,
        wordCount,
      }),
    );

    await BookSegment.insertMany(segmentsToInsert);

    await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });

    console.log("Book segments saved successfully.");

    return {
      success: true,
      data: { segmentsCreated: segments.length },
    };
  } catch (e) {
    console.error("Error saving book segments", e);

    return {
      success: false,
      error: (e as Error).message,
    };
  }
};

// Searches book segments using MongoDB text search with regex fallback
export const searchBookSegments = async (
  bookId: string,
  query: string,
  limit: number = 5,
) => {
  try {
    const parsedInput = SearchBookSegmentsSchema.safeParse({
      bookId,
      query,
      limit,
    });

    if (!parsedInput.success) {
      return { success: false, error: "Invalid search parameters", data: [] };
    }

    await connectToDatabase();

    const { bookId: validBookId, query: validQuery } = parsedInput.data;
    const validLimit = parsedInput.data.limit ?? 5;

    console.log(`Searching for: "${validQuery}" in book ${validBookId}`);

    const bookObjectId = new mongoose.Types.ObjectId(validBookId);

    // Try MongoDB text search first (requires text index)
    let segments: Record<string, unknown>[] = [];
    try {
      segments = await BookSegment.find({
        bookId: bookObjectId,
        $text: { $search: validQuery },
      })
        .select("_id bookId content segmentIndex pageNumber wordCount")
        .sort({ score: { $meta: "textScore" } })
        .limit(validLimit)
        .lean();
    } catch {
      // Text index may not exist — fall through to regex fallback
      segments = [];
    }

    // Fallback: regex search matching ANY keyword
    if (segments.length === 0) {
      const keywords = validQuery.split(/\s+/).filter((k) => k.length > 2);
      if (keywords.length === 0) {
        return { success: true, data: serializeData(segments) };
      }
      const pattern = keywords.map(escapeRegex).join("|");

      segments = await BookSegment.find({
        bookId: bookObjectId,
        content: { $regex: pattern, $options: "i" },
      })
        .select("_id bookId content segmentIndex pageNumber wordCount")
        .sort({ segmentIndex: 1 })
        .limit(validLimit)
        .lean();
    }

    console.log(`Search complete. Found ${segments.length} results`);

    return {
      success: true,
      data: serializeData(segments),
    };
  } catch (error) {
    console.error("Error searching segments:", error);
    return {
      success: false,
      error: (error as Error).message,
      data: [],
    };
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    const parsedInput = DeleteBookSchema.safeParse({ bookId });

    if (!parsedInput.success) {
      return { success: false, error: "Invalid book id" };
    }

    await connectToDatabase();

    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const rateLimit = await actionRateLimit({
      tier: "authed",
      identifier: userId,
    });

    if (rateLimit.limited) {
      return { success: false, error: RATE_LIMITED_ERROR };
    }

    if (!mongoose.Types.ObjectId.isValid(parsedInput.data.bookId)) {
      return { success: false, error: "Invalid book id" };
    }

    const book = await Book.findOne({
      _id: parsedInput.data.bookId,
      clerkId: userId,
    }).lean();

    if (!book) {
      return { success: false, error: "Book not found" };
    }

    await BookSegment.deleteMany({ bookId: book._id });

    await Book.deleteOne({ _id: book._id });

    const blobKeys = [book.fileBlobKey, book.coverBlobKey].filter(
      (key): key is string => Boolean(key),
    );

    if (blobKeys.length > 0) {
      try {
        await del(blobKeys);
      } catch (e) {
        console.error("Error deleting blobs", e);
      }
    }

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/library");

    return { success: true };
  } catch (e) {
    console.error("Error deleting book", e);

    return {
      success: false,
      error: (e as Error).message,
    };
  }
};
