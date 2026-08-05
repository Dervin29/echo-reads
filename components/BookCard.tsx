"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookCardProps } from "@/types";
import Image from "next/image";
import DeleteBookButton from "./DeleteBookButton";

const BookCard = ({
  title,
  author,
  coverURL,
  slug,
  _id,
  index = 0,
}: BookCardProps) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        ease: [0.32, 0.72, 0, 1],
        delay: (index % 10) * 0.06,
      }}
    >
      <Link href={`/books/${slug}`} className="block">
        <article className="book-card">
          <figure className="book-card-3d book-card-3d-hover">
            <div className="book-card-spine" />
            <div className="bezel-sm">
              <div className="bezel-core-sm relative aspect-[2/3] w-full overflow-hidden bg-paper-soft">
                <Image
                  src={coverURL}
                  alt={title}
                  width={300}
                  height={450}
                  loading="lazy"
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="book-card-cover group-hover:scale-[1.05]"
                />
              </div>
            </div>
          </figure>

          <figcaption className="book-card-meta">
            <h3 className="book-card-title">{title}</h3>
            <p className="book-card-author">{author}</p>
          </figcaption>
        </article>
      </Link>

      <DeleteBookButton bookId={_id} title={title} />
    </motion.div>
  );
};
export default BookCard;
