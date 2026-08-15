import { SimilarCasesResponse } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { Users, Check, Minus } from "lucide-react";

interface SimilarCasesResponseCardProps {
  response: SimilarCasesResponse;
}

const SimilarCasesResponseCard = ({ response }: SimilarCasesResponseCardProps) => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3 max-w-md">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-purple-600" />
        <span className="font-semibold text-purple-800">유사 사례</span>
      </div>

      <p className="text-sm text-purple-900 leading-relaxed">{response.answer_text}</p>

      <div className="space-y-3">
        {response.cases.map((c, idx) => (
          <div
            key={`${c.anonymized_label}-${idx}`}
            className="bg-white/60 border border-purple-200 rounded-md p-3 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-900">
                {c.anonymized_label}
              </span>
              <Badge
                variant={c.diagnosis === "malignant" ? "destructive" : "secondary"}
                className="text-xs"
              >
                {c.diagnosis === "malignant" ? "악성" : "양성"}
              </Badge>
            </div>

            <div className="text-xs text-purple-700">
              {c.date} · {c.anatomy_site}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                {c.shared_features.map((f, i) => (
                  <div key={i} className="flex items-center gap-1 text-green-700">
                    <Check className="h-3 w-3 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                {c.differences.map((d, i) => (
                  <div key={i} className="flex items-center gap-1 text-gray-500">
                    <Minus className="h-3 w-3 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-purple-800 leading-relaxed">{c.clinical_note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarCasesResponseCard;
