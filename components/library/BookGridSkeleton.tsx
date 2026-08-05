const BookGridSkeleton = () => {
  return (
    <div className="library-books-grid" aria-hidden>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className={index % 2 === 1 ? "lg:mt-10" : undefined}
        >
          <div className="bezel-sm">
            <div className="bezel-core-sm">
              <div className="skeleton aspect-[2/3] w-full rounded-[calc(1.5rem-0.375rem)]" />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGridSkeleton;
