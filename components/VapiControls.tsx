"use client";

import { useVapi } from "@/hooks/useVapi";
import { IBook } from "@/types";
import { Mic, MicOff } from "lucide-react";
import Image from "next/image";
import React from "react";
import Transcript from "@/components/Transcript";

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
    clearErrors,
  } = useVapi(book);

  const { title, author, coverURL, persona } = book;
  return (
    <>
      {" "}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="vapi-header-card">
          <div className="vapi-cover-wrapper">
            <Image
              src={coverURL || "/placeholder-cover.jpg"}
              alt={title}
              width={162}
              height={240}
              className="vapi-cover-image"
            />
            <div className="vapi-mic-wrapper">
              {(isActive && (status === "thinking" || status === "speaking")) && (
                <div className="vapi-pulse-ring" />
              )}
              <button
                className={`vapi-mic-btn ${isActive ? "vapi-mic-btn-active" : "vapi-mic-btn-inactive"}`}
                aria-label={isActive ? "Stop conversation" : "Start conversation"}
                onClick={isActive ? stop : start}
                disabled={status === "connecting"}
              >
                {isActive ? (
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                ) : (
                  <MicOff className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#212a3b]">
              {title}
            </h1>
            <p className="text-[#3d485e] text-sm sm:text-base">by {author}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="vapi-status-indicator">
                <span className="vapi-status-dot vapi-status-dot-ready" />
                <span className="vapi-status-text">Ready</span>
              </span>
              <span className="vapi-badge-ai">
                <span className="vapi-badge-ai-text">
                  Voice: {persona || "Default"}
                </span>
              </span>
              <span className="vapi-badge-ai">
                <span className="vapi-badge-ai-text">0:00/15:00</span>
              </span>
            </div>
          </div>
        </div>
        <div className="transcript-container min-h-[400px]">
          <div className="vapi-transcript-wrapper">
            <Transcript
              messages={messages}
              currentMessage={currentMessage}
              currentUserMessage={currentUserMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VapiControls;
