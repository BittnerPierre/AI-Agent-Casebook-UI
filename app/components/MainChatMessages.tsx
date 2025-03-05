import { Message } from '../types';
import AIMessage from './AIMessage';

interface MainChatMessagesProps {
  messages: Message[];
  threadId?: string;
}

export default function MainChatMessages({ messages, threadId }: MainChatMessagesProps) {
  // Filter only user messages and host-producer messages
  const mainMessages = messages.filter(
    message => 
      message.type !== "tool" && 
      !(message.type === "ai" && !message.content) &&
      (message.type === "human" || (message.type === "ai" && message.name === "host-producer"))
  );

  return (
    <div className="space-y-4">
      {mainMessages.map((message, index) => (
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
                threadId={threadId} 
              />
            ) : (
              message.content as string
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
