import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw } from "lucide-react";
import {
  isAnswerResponse,
  isBriefResponse,
  isSimilarCasesResponse,
} from "@/lib/chatResponse";
import BriefResponseCard from "@/components/chat/responses/BriefResponseCard";
import SimilarCasesResponseCard from "@/components/chat/responses/SimilarCasesResponseCard";
import AnswerResponseCard from "@/components/chat/responses/AnswerResponseCard";
import type { ChatUiMessage } from "@/components/chat/PatientChatPanel";

interface ChatMessageBubbleProps {
  message: ChatUiMessage;
  onRetry: () => void;
}

const ChatMessageBubble = ({ message, onRetry }: ChatMessageBubbleProps) => {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-md text-sm whitespace-pre-wrap">
          {message.text}
        </div>
      </div>
    );
  }

  if (message.status === "pending") {
    return (
      <div className="flex justify-start">
        <div className="bg-gray-100 text-gray-900 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2 flex items-center gap-2 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          답변을 생성하는 중...
        </div>
      </div>
    );
  }

  if (message.status === "error") {
    return (
      <div className="flex justify-start">
        <div className="border border-red-200 bg-red-50 text-red-600 rounded-2xl rounded-bl-sm px-4 py-2 max-w-md text-sm space-y-2">
          <p>{message.text}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RotateCcw className="h-3 w-3 mr-1" />
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  // status === "done"
  if (!message.response) return null;

  return (
    <div className="flex justify-start">
      {isBriefResponse(message.response) && (
        <BriefResponseCard response={message.response} />
      )}
      {isSimilarCasesResponse(message.response) && (
        <SimilarCasesResponseCard response={message.response} />
      )}
      {isAnswerResponse(message.response) && (
        <AnswerResponseCard response={message.response} />
      )}
    </div>
  );
};

export default ChatMessageBubble;
