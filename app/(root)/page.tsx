import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { getAllBooks } from "@/lib/actions/book.actions";

export const dynamic = "force-dynamic";

const page = async () => {
  const bookResults = await getAllBooks();
  const books = bookResults ? (bookResults.data ?? []) : [];
  return (
    <main className="wrapper container page-offset min-h-screen bg-[#f5f1e8] p-8">
      <HeroSection />

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

export default page;
