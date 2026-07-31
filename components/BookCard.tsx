import Link from "next/link";
import { BookCardProps } from "@/types";
import Image from "next/image";

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
  return (
    <Link href={`/books/${slug}`} className="group block">
      <article className="book-card">
        <figure className="book-card-3d book-card-3d-hover">
          <div className="book-card-spine" />
          <div className="book-card-cover-wrapper">
            <Image
              src={coverURL}
              alt={title}
              width={133}
              height={200}
              className="book-card-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </figure>

        <figcaption className="book-card-meta">
          <h3 className="book-card-title transition-colors group-hover:text-[var(--color-brand)]">
            {title}
          </h3>
          <p className="book-card-author">{author}</p>
        </figcaption>
      </article>
    </Link>
  );
};
export default BookCard;
