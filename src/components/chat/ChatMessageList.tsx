import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessageBubble from "@/components/chat/ChatMessageBubble";
import type { ChatUiMessage } from "@/components/chat/PatientChatPanel";

interface ChatMessageListProps {
  messages: ChatUiMessage[];
  onRetry: (id: string) => void;
}

const ChatMessageList = ({ messages, onRetry }: ChatMessageListProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        환자 히스토리에 대해 궁금한 점을 물어보세요.
      </div>
    );
  }

  return (
    <ScrollArea className="h-80 pr-3" viewportRef={viewportRef}>
      <div className="space-y-3">
        {messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            message={message}
            onRetry={() => onRetry(message.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatMessageList;
