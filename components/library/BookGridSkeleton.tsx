const BookGridSkeleton = () => {
  return (
    <div className="library-books-grid" aria-hidden>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="skeleton h-[205px] rounded-[14px] md:h-[240px]" />
          <div className="skeleton h-5 w-3/4 rounded-md" />
          <div className="skeleton h-4 w-1/2 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default BookGridSkeleton;
