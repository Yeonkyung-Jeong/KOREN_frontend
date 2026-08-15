import { AnswerResponse } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

interface AnswerResponseCardProps {
  response: AnswerResponse;
}

const AnswerResponseCard = ({ response }: AnswerResponseCardProps) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 max-w-md">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-slate-600" />
        <span className="font-semibold text-slate-800">답변</span>
      </div>

      <p className="text-sm text-slate-900 leading-relaxed">{response.answer_text}</p>

      {response.citations.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {response.citations.map((c, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {c.date} · {c.anatomy_site}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerResponseCard;
