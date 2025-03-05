"use client";

import { useState } from 'react';
import { Message } from '../types';
import { useStream } from "@langchain/langgraph-sdk/react";
import { useSearchParams, useRouter } from 'next/navigation';
import MainChatMessages from '../components/MainChatMessages';
import InternalAgentsAccordion from '../components/InternalAgentsAccordion';

export default function VideoScriptingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [threadId, setThreadId] = useState<string | null>(
    searchParams.get('threadId') || null
  );

  const thread = useStream<{
    messages: Message[]
  }>({
    apiUrl: "http://localhost:2024", 
    assistantId: "video_script",
    threadId: threadId,
    onThreadId: (newThreadId) => {
      setThreadId(newThreadId);
      const params = new URLSearchParams(searchParams.toString());
      params.set('threadId', newThreadId);
      router.push(`?${params.toString()}`);
    }
  });

  // Find the index of the last user message to split messages
  const lastUserMessageIndex = thread.messages
    ? [...thread.messages].reverse().findIndex(msg => msg.type === 'human')
    : -1;

  return (
    <div className="flex flex-col h-[calc(100vh-88px)] bg-black text-gray-200">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-4">
          {/* Main chat messages up to the last user message - only host-producer and user */}
          <MainChatMessages 
            messages={thread.messages?.slice(0, thread.messages.length - lastUserMessageIndex)
              .filter(msg => msg.type === 'human' || (msg.type === 'ai' && msg.name === 'host-producer')) || []}
            threadId={threadId || undefined}
          />
          
          {/* Internal agents accordion after the last user message */}
          {thread.messages && thread.messages.length > 0 && (
            <InternalAgentsAccordion 
              messages={thread.messages?.slice(thread.messages.length - lastUserMessageIndex)
                .filter(msg => msg.type === 'ai' && ['researcher', 'writer', 'planner', 'reviewer'].includes(msg.name || ''))}
              isLoading={thread.isLoading}
            />
          )}
          
          {/* Remaining main chat messages - only host-producer and user */}
          <MainChatMessages 
            messages={thread.messages?.slice(thread.messages.length - lastUserMessageIndex)
              .filter(msg => msg.type === 'human' || (msg.type === 'ai' && msg.name === 'host-producer')) || []}
            threadId={threadId || undefined}
          />
        </div>
      </div>

      <div className="sticky bottom-0 bg-black border-t border-zinc-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const message = new FormData(form).get("message") as string;
            form.reset();
            thread.submit({ 
              messages: [{ 
                content: message,
                role: "user" 
              }] 
            }, {
              config: {
                recursion_limit: 99
              }
            });
          }}
          className="flex gap-4 p-4"
        >
          <input
            type="text"
            name="message"
            className="flex-1 bg-zinc-900 text-gray-200 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-zinc-700 focus:ring-0"
            placeholder="Describe your video script needs..."
          />
          {thread.isLoading ? (
            <button
              type="button"
              onClick={() => thread.stop()}
              className="px-6 py-3 bg-zinc-800 text-gray-200 rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-3 bg-zinc-800 text-gray-200 rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Send
            </button>
          )}
        </form>
      </div>
    </div>
  );
}