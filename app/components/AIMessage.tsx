"use client";

import { useState } from 'react';
import { marked } from 'marked';
import { useStream } from "@langchain/langgraph-sdk/react";
import { Message } from "../types";
import { useSearchParams, useRouter } from 'next/navigation';

interface AIMessageProps {
  message: Message; 
  assistantId: string;
  threadId?: string;
}

export default function AIMessage({ message, assistantId, threadId: initialThreadId }: AIMessageProps) {
  const [showRaw, setShowRaw] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [threadId, setThreadId] = useState<string | null>(
    searchParams.get('threadId') || initialThreadId || null
  );

  const thread = useStream<{ messages: Message[] }>({
    apiUrl: "http://localhost:2024",
    assistantId: assistantId,
    threadId: threadId,
    onThreadId: (newThreadId) => {
      setThreadId(newThreadId);
      const params = new URLSearchParams(searchParams.toString());
      params.set('threadId', newThreadId);
      router.push(`?${params.toString()}`);
    }
  });

  // Afficher toutes les propriétés du message
  const messageData = {
    ...message,
    _thread: thread.messages?.find(m => m.id === message.id),
    _metadata: thread.getMessagesMetadata?.(message as any),
  };

  return (
    <div className="group relative">
      <div className="prose prose-invert prose-sm max-w-none prose-p:my-0 prose-headings:my-0">
        <div dangerouslySetInnerHTML={{ __html: marked(message.content as string) }} />
      </div>
      
      <button
        onClick={() => setShowRaw(!showRaw)}
        className="absolute top-2 right-2 text-xs text-gray-500 hover:text-gray-300"
      >
        {showRaw ? 'Hide Raw' : 'Show Raw'} (Debug)
      </button>

      {showRaw && (
        <div className="mt-4 p-3 bg-zinc-950 rounded border border-zinc-800 font-mono text-xs">
          <pre className="text-gray-300 overflow-auto whitespace-pre-wrap">
            {JSON.stringify(messageData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 