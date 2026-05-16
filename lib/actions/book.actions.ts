"use server";

import { connectToDatabase } from "../../database/mongoose";
import { generateSlug, serializeData } from "../../lib/utils";
import { CreateBook, TextSegment } from "../../types";
import Book from "../../database/models/book.model";
import BookSegment from "@/database/models/book-segment.models";

export const checkBookExists = async (title: string) => {
  try {
    await connectToDatabase();

    const slug = generateSlug(title);

    const exisitingBook = await Book.findOne({ slug }).lean();

    if (exisitingBook) {
      return {
        exists: true,
        book: serializeData(exisitingBook),
      };
    }

    return {
      exists: false,
    };
  } catch (error) {
    console.log("Error checking book exists", error);
    return {
      exists: false,
      error: error,
    };
  }
};

export const createBook = async (data: CreateBook) => {
  try {
    await connectToDatabase();

    const slug = generateSlug(data.title);

    const exisitingBook = await Book.findOne({ slug }).lean();

    if (exisitingBook) {
      return {
        success: false,
        data: serializeData(exisitingBook),
        alreadyExists: true,
      };
    }

    //check subscription limits before creating a book

    const book = await Book.create({
      ...data,
      slug,
      totalSegments: 0,
    });

    return {
      success: true,
      data: serializeData(book),
    };
  } catch (e) {
    console.log("Error creating a book", e);
    return {
      success: false,
      error: e,
    };
  }
};

export const saveBookSegments = async (
  bookId: string,
  clerkId: string,
  segments: TextSegment[],
) => {
  try {
    await connectToDatabase();

    console.log("Saving book segments...");

    const segmentsToInsert = segments.map(
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
      error: e,
    };
  }
};
