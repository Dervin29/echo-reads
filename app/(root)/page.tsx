import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import Search from "@/components/Search";
import { getAllBooks } from "@/lib/actions/book.actions";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { query } = await searchParams;
  const searchQuery = typeof query === "string" ? query : "";
  const bookResults = await getAllBooks(searchQuery);
  const books = bookResults ? (bookResults.data ?? []) : [];

  return (
    <main className="wrapper container page-offset min-h-screen bg-[#f5f1e8] p-8">
      <HeroSection />

      <div className="library-filter-bar">
        <h2 className="section-title">Recent Books</h2>
        <Suspense fallback={null}>
          <Search />
        </Suspense>
      </div>

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
    </main>
  );
};

export default Page;
