"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteBook } from "@/lib/actions/book.actions";
import ConfirmDialog from "./ConfirmDialog";

interface DeleteBookButtonProps {
  bookId: string;
  title: string;
}

const DeleteBookButton = ({ bookId, title }: DeleteBookButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBook(bookId);

      if (result.success) {
        toast.success("Book deleted successfully.");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete book. Please try again.");
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDialogOpen(true)}
        disabled={isPending}
        aria-label={`Delete ${title}`}
        className="absolute right-3 top-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border border-hairline bg-cream/90 text-[#a44534] opacity-100 shadow-soft-sm backdrop-blur transition-all duration-300 hover:bg-[#a44534] hover:text-white focus-visible:opacity-100 disabled:cursor-not-allowed disabled:opacity-50 lg:opacity-0 lg:group-hover:opacity-100"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </button>

      <ConfirmDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleDelete}
        title="Delete this book?"
        description={`"${title}" and its audio segments will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
      />
    </>
  );
};

export default DeleteBookButton;
