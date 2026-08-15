import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { apiService, ChatResponse } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { getStoredSessionId, setStoredSessionId } from "@/lib/chatSession";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";

export interface ChatUiMessage {
  id: string;
  role: "user" | "assistant";
  status: "done" | "pending" | "error";
  text?: string;
  response?: ChatResponse;
  retryText?: string;
}

interface PatientChatPanelProps {
  patientId: string;
}

const PatientChatPanel = ({ patientId }: PatientChatPanelProps) => {
  const [messages, setMessages] = useState<ChatUiMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [chatStatus, setChatStatus] = useState<"idle" | "sending">("idle");
  const { toast } = useToast();

  useEffect(() => {
    setSessionId(getStoredSessionId(patientId));
    setMessages([]);
  }, [patientId]);

  const runAssistantRequest = async (
    assistantMessageId: string,
    text: string
  ) => {
    setChatStatus("sending");
    try {
      const result = await apiService.sendChatMessage(patientId, text, sessionId);
      if (!sessionId) {
        setSessionId(result.session_id);
        setStoredSessionId(patientId, result.session_id);
      }
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? { ...m, status: "done", response: result.response }
            : m
        )
      );
    } catch (error) {
      console.error("챗봇 응답 요청 실패:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                status: "error",
                text: "답변을 가져오지 못했습니다. 다시 시도해주세요.",
                retryText: text,
              }
            : m
        )
      );
      toast({
        title: "요청 실패",
        description: "챗봇 응답을 가져오는데 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setChatStatus("idle");
    }
  };

  const handleSend = (text: string) => {
    const userMessage: ChatUiMessage = {
      id: crypto.randomUUID(),
      role: "user",
      status: "done",
      text,
    };
    const assistantMessage: ChatUiMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      status: "pending",
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    void runAssistantRequest(assistantMessage.id, text);
  };

  const handleRetry = (messageId: string) => {
    const target = messages.find((m) => m.id === messageId);
    if (!target || !target.retryText) return;
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, status: "pending" } : m))
    );
    void runAssistantRequest(messageId, target.retryText);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          환자 히스토리 챗봇
        </CardTitle>
        <CardDescription>
          이 환자의 진단·진료 이력에 대해 자유롭게 질문할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChatMessageList messages={messages} onRetry={handleRetry} />
        <ChatInput disabled={chatStatus === "sending"} onSend={handleSend} />
      </CardContent>
    </Card>
  );
};

export default PatientChatPanel;
