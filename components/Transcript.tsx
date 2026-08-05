'use client';

import { useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';
import { Messages } from '@/types';

interface TranscriptProps {
  messages: Messages[];
  currentMessage: string;
  currentUserMessage: string;
}

const Transcript = ({ messages, currentMessage, currentUserMessage }: TranscriptProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentMessage, currentUserMessage]);

  const isEmpty = messages.length === 0 && !currentMessage && !currentUserMessage;

  if (isEmpty) {
    return (
      <div className="transcript-empty">
        <div className="relative mb-4">
          <span className="absolute inset-0 rounded-full bg-brand/15 animate-ring-pulse" />
          <span className="relative flex size-16 items-center justify-center rounded-full bg-paper-soft text-brand shadow-[inset_0_0_0_1px_var(--hairline)]">
            <Mic className="size-7 text-brand" strokeWidth={1.5} />
          </span>
        </div>
        <h2 className="transcript-empty-text"><b>No conversation yet</b></h2>
        <p className="transcript-empty-hint">
          Click the mic button above to start talking
        </p>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="transcript-messages overflow-y-auto pr-2 flex-1">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`transcript-message ${
            message.role === 'user' ? 'transcript-message-user' : 'transcript-message-assistant'
          }`}
        >
          <div
            className={`transcript-bubble ${
              message.role === 'user' ? 'transcript-bubble-user' : 'transcript-bubble-assistant'
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}

      {/* User Streaming Message */}
      {currentUserMessage && (
        <div className="transcript-message transcript-message-user">
          <div className="transcript-bubble transcript-bubble-user">
            {currentUserMessage}
            <span className="transcript-cursor" />
          </div>
        </div>
      )}

      {/* Assistant Streaming Message */}
      {currentMessage && (
        <div className="transcript-message transcript-message-assistant">
          <div className="transcript-bubble transcript-bubble-assistant">
            {currentMessage}
            <span className="transcript-cursor" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Transcript;