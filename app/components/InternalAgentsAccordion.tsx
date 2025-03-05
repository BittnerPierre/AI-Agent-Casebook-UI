import { useState, useEffect } from 'react';
import { Message } from '../types';

interface InternalAgentsAccordionProps {
  messages: Message[];
  isLoading: boolean;
}

export default function InternalAgentsAccordion({ messages, isLoading }: InternalAgentsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(0);

  // Filter internal agent messages
  const internalAgents = ['researcher', 'writer', 'planner', 'reviewer', 'supervisor'];
  const internalMessages = messages.filter(
    msg => msg.type === 'ai' && 
    msg.type && 
    internalAgents.includes(msg.name) && 
    msg.content
  );

  // Check for new messages
  useEffect(() => {
    if (internalMessages.length > lastMessageCount) {
      setHasNewMessages(true);
      setLastMessageCount(internalMessages.length);
    }
  }, [internalMessages.length, lastMessageCount]);

  // Group messages by agent
  const groupedMessages = internalMessages.reduce((acc, msg) => {
    if (!msg.type) return acc;
    if (!acc[msg.type]) acc[msg.type] = [];
    acc[msg.type].push(msg);
    return acc;
  }, {} as Record<string, Message[]>);

  return (
    <div className="mb-4 border border-zinc-800 rounded-lg">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewMessages(false);
        }}
        className="w-full px-4 py-3 flex items-center justify-between bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">Conversations internes</span>
          {hasNewMessages && (
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
          {isLoading && !isOpen && (
            <span className="text-zinc-400 animate-pulse">...</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 bg-zinc-900/50">
          {Object.entries(groupedMessages).map(([agent, messages]) => (
            <div key={agent} className="space-y-2">
              <h3 className="text-sm font-medium text-zinc-400 capitalize">
                {agent}
              </h3>
              <div className="space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={`${agent}-${idx}`}
                    className="text-sm text-zinc-300 bg-zinc-900 p-3 rounded border border-zinc-800"
                  >
                    {msg.content as string}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-zinc-400 animate-pulse">
              Agent en train d'écrire...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
