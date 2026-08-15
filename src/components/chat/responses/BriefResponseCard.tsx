import { BriefResponse } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface BriefResponseCardProps {
  response: BriefResponse;
}

const BriefResponseCard = ({ response }: BriefResponseCardProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3 max-w-md">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-blue-600" />
        <span className="font-semibold text-blue-800">환자 히스토리 브리핑</span>
      </div>

      <div className="text-xs text-blue-700">
        총 {response.summary.total_diagnoses}건 · {response.summary.date_range}
      </div>

      <div className="space-y-2 border-l-2 border-blue-300 pl-3">
        {response.timeline.map((entry) => (
          <div key={entry.diagnosis_id} className="text-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-900 font-medium">{entry.date}</span>
              <Badge
                variant={entry.diagnosis === "malignant" ? "destructive" : "secondary"}
                className="text-xs"
              >
                {entry.diagnosis === "malignant" ? "악성" : "양성"}
              </Badge>
            </div>
            <div className="text-blue-700 text-xs mb-1">{entry.anatomy_site}</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-blue-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${entry.confidence_score * 100}%` }}
                />
              </div>
              <span className="text-xs text-blue-800 font-medium">
                신뢰도 {(entry.confidence_score * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-blue-900 leading-relaxed">
        {response.narrative_summary}
      </p>

      <div className="text-sm text-blue-800 bg-blue-100 rounded p-2">
        {response.recommendation}
      </div>
    </div>
  );
};

export default BriefResponseCard;
