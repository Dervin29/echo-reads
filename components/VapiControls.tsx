"use client";

import { Mic, MicOff } from "lucide-react";
import useVapi from "@/hooks/useVapi";
import { IBook } from "@/types";
import Image from "next/image";
import Transcript from "@/components/Transcript";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VapiControls = ({ book }: { book: IBook }) => {
  const {
    status,
    isActive,
    messages,
    currentMessage,
    currentUserMessage,
    duration,
    start,
    stop,
    clearError,
    limitError,
    isBillingError,
    maxDurationSeconds,
  } = useVapi(book);
  const router = useRouter();

  useEffect(() => {
    if (limitError) {
      toast.error(limitError);
      if (isBillingError) {
        router.push("/subscriptions");
      } else {
        router.push("/library");
      }
      clearError();
    }
  }, [isBillingError, limitError, router, clearError]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "connecting":
        return { label: "Connecting...", color: "vapi-status-dot-connecting" };
      case "starting":
        return { label: "Starting...", color: "vapi-status-dot-starting" };
      case "listening":
        return { label: "Listening", color: "vapi-status-dot-listening" };
      case "thinking":
        return { label: "Thinking...", color: "vapi-status-dot-thinking" };
      case "speaking":
        return { label: "Speaking", color: "vapi-status-dot-speaking" };
      default:
        return { label: "Ready", color: "vapi-status-dot-ready" };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="vapi-main-container">
      <div className="flex w-full flex-col gap-8">
        <div className="bezel">
          <div className="bezel-core relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gold/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <div className="vapi-cover-wrapper">
                <Image
                  src={book.coverURL || "/images/book-placeholder.png"}
                  alt={book.title}
                  width={120}
                  height={180}
                  className="vapi-cover-image !h-auto !w-[110px] sm:!w-[130px]"
                  priority
                />
                <div className="vapi-mic-wrapper relative">
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-brand/30 animate-ring-pulse" />
                  )}
                  <button
                    onClick={isActive ? stop : start}
                    disabled={status === "connecting"}
                    aria-label={
                      isActive ? "Stop Voice Assistant" : "Start Voice Assistant"
                    }
                    title={
                      isActive ? "Stop Voice Assistant" : "Start Voice Assistant"
                    }
                    className={`vapi-mic-btn z-10 !size-[58px] sm:!size-[64px] ${isActive ? "vapi-mic-btn-active" : "vapi-mic-btn-inactive"}`}
                  >
                    {isActive ? (
                      <Mic className="size-7 text-brand-ink" strokeWidth={1.5} />
                    ) : (
                      <MicOff className="size-7 text-ink" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-5">
                <div>
                  <h1 className="mb-1 font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {book.title}
                  </h1>
                  <p className="font-medium text-ink-soft">
                    by {book.author}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="vapi-status-indicator">
                    <span className={`vapi-status-dot ${statusDisplay.color}`} />
                    <span className="vapi-status-text">{statusDisplay.label}</span>
                  </div>

                  <div className="vapi-status-indicator">
                    <span className="vapi-status-text">
                      Voice: {book.persona || "Daniel"}
                    </span>
                  </div>

                  <div className="vapi-status-indicator">
                    <span className="vapi-status-text">
                      {formatDuration(duration)}/
                      {formatDuration(maxDurationSeconds)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="vapi-transcript-wrapper">
          <div className="transcript-container min-h-[400px]">
            <Transcript
              messages={messages}
              currentMessage={currentMessage}
              currentUserMessage={currentUserMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default VapiControls;
