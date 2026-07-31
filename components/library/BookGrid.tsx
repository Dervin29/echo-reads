import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";
import type { IBook } from "@/types";
import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";

type BookSummary = Pick<IBook, "_id" | "title" | "author" | "slug" | "coverURL">;

const BookGrid = async ({ query }: { query: string }) => {
  const bookResults = await getAllBooks(query);
  const books: BookSummary[] = bookResults ? (bookResults.data ?? []) : [];

  if (books.length === 0) {
    const isSearching = query.trim().length > 0;
    return (
      <div className="library-empty-state">
        <div className="library-empty-state-icon">
          <BookOpen className="size-8 text-[var(--color-brand)]" />
        </div>
        <h3 className="library-empty-state-title">
          {isSearching ? "No books found" : "Your library is empty"}
        </h3>
        <p className="library-empty-state-description">
          {isSearching ? (
            <>
              We couldn&apos;t find any books matching{" "}
              <span className="font-semibold text-[#212a3b]">&quot;{query}&quot;</span>.
              Try a different title or author.
            </>
          ) : (
            "Add a book to start chatting with it through AI-powered voice."
          )}
        </p>
        {isSearching ? null : (
          <Link href="/books/new" className="btn-primary">
            <Plus className="size-5" />
            Add Your First Book
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      <p className="library-count">
        {books.length} {books.length === 1 ? "book" : "books"}
      </p>
      <div className="library-books-grid">
        {books.map((book) => (
          <BookCard
            key={book._id}
            title={book.title}
            author={book.author}
            slug={book.slug}
            coverURL={book.coverURL}
          />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
