import BookGrid from "@/components/library/BookGrid";
import BookGridSkeleton from "@/components/library/BookGridSkeleton";
import LibraryHeader from "@/components/library/LibraryHeader";
import Search from "@/components/Search";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const LibraryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const { query } = await searchParams;
  const searchQuery = typeof query === "string" ? query : "";

  return (
    <main className="wrapper container bg-paper">
      <LibraryHeader />

      <div className="library-filter-bar mt-10 md:mt-14">
        <div>
          <h2 className="section-title">
            {searchQuery ? "Search Results" : "Recent Books"}
          </h2>
          <p className="mt-1.5 text-sm text-ink-soft">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : "Your latest additions"}
          </p>
        </div>
        <Suspense fallback={null}>
          <Search />
        </Suspense>
      </div>

      <Suspense fallback={<BookGridSkeleton />}>
        <BookGrid query={searchQuery} />
      </Suspense>
    </main>
  );
};

export default LibraryPage;
