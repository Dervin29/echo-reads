import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBookBySlug } from "@/lib/actions/book.actions";
import VapiControls from "@/components/VapiControls";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BookDetailPage = async ({ params }: PageProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) redirect("/library");

  return (
    <main className="book-page-container">
      <Link href="/library" className="back-btn-floating">
        <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
      </Link>

      <VapiControls book={result.data} />
    </main>
  );
};

export default BookDetailPage;
