import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MicOff } from "lucide-react";
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

  if (!result.success || !result.data) redirect("/");

  const { title, author, coverURL, persona } = result.data;

  return (
    <main className="book-page-container">
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="w-5 h-5 text-[#212a3b]" />
      </Link>

      <VapiControls book={result.data} />
    </main>
  );
};

export default BookDetailPage;
