import type {
  AnswerResponse,
  BriefResponse,
  ChatResponse,
  SimilarCasesResponse,
} from "@/services/api";

export function isBriefResponse(r: ChatResponse): r is BriefResponse {
  return r.type === "brief";
}

export function isSimilarCasesResponse(
  r: ChatResponse
): r is SimilarCasesResponse {
  return r.type === "similar_cases";
}

export function isAnswerResponse(r: ChatResponse): r is AnswerResponse {
  return r.type === "answer";
}
