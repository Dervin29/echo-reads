import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

const LibraryHeader = () => {
  return (
    <section className="library-header">
      <div className="library-header-content">
        <div className="library-header-text">
          <p className="library-header-badge">Your personal bookshelf</p>
          <h1 className="library-header-title">Your Library</h1>
          <p className="library-header-description">
            Upload a PDF and chat with your favorite reads through natural,
            AI-powered voice. Ask questions, get summaries, and dive deeper
            into any book — anytime.
          </p>
          <Link href="/books/new" className="btn-primary">
            <Plus className="size-5" />
            Add New Book
          </Link>
        </div>

        <div className="library-header-illustration">
          <Image
            src="/assets/hero-illustration.png"
            alt="Vintage books and a globe"
            width={360}
            height={360}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default LibraryHeader;
