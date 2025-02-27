"use client";

import { useState } from 'react';
import { Message } from '../types';
import { useStream,  } from "@langchain/langgraph-sdk/react";
import { marked } from "marked";
import AIMessage from '../components/AIMessage';
import { conversationStarters } from "../../components/conversation-starters";
import { useSearchParams, useRouter } from 'next/navigation';


export default function VideoScriptingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [threadId, setThreadId] = useState<string | null>(
    searchParams.get('threadId') || null
  );

  const thread = useStream<
  { messages: Message[]
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

  return (
    <div className="flex flex-col h-[calc(100vh-88px)] bg-black text-gray-200">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-4">
          {thread.messages?.filter(message => 
            message.type !== "tool" && 
            !(message.type === "ai" && !message.content)
          ).map((message, index) => (
            <div
              key={`${message.id}-${index}`}
              className={`flex ${
                message.type === "human" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === "human"
                    ? "bg-zinc-800 text-gray-200"
                    : "bg-zinc-900 border border-zinc-800 text-gray-300"
                }`}
              >
                {message.type === "ai" ? (
                  <AIMessage 
                    message={message} 
                    assistantId="video_script"
                    threadId={threadId || undefined} 
                  />
                ) : (
                  message.content as string
                )}
              </div>
            </div>
          ))}
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
                recursion_limit: 99  // Vos paramètres personnalisés
              }
            });
          }}
          className="flex gap-4 p-4"
        >
          <input
            type="text"
            name="message"
            className="flex-1 bg-zinc-900 text-gray-200 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-zinc-700"
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