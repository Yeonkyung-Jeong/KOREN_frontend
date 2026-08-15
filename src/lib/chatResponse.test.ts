import { describe, expect, it } from "vitest";
import {
  isAnswerResponse,
  isBriefResponse,
  isSimilarCasesResponse,
} from "./chatResponse";
import type {
  AnswerResponse,
  BriefResponse,
  ChatResponse,
  SimilarCasesResponse,
} from "@/services/api";

const brief: BriefResponse = {
  type: "brief",
  summary: { total_diagnoses: 1, date_range: "2025-01-01 ~ 2025-01-01" },
  timeline: [],
  narrative_summary: "요약",
  recommendation: "권고",
};

const similarCases: SimilarCasesResponse = {
  type: "similar_cases",
  cases: [],
  answer_text: "유사 사례 답변",
};

const answer: AnswerResponse = {
  type: "answer",
  answer_text: "답변",
  citations: [],
};

const cases: Array<[string, ChatResponse]> = [
  ["brief", brief],
  ["similar_cases", similarCases],
  ["answer", answer],
];

describe("isBriefResponse", () => {
  it.each(cases)("returns true only for brief (case: %s)", (label, response) => {
    expect(isBriefResponse(response)).toBe(label === "brief");
  });
});

describe("isSimilarCasesResponse", () => {
  it.each(cases)(
    "returns true only for similar_cases (case: %s)",
    (label, response) => {
      expect(isSimilarCasesResponse(response)).toBe(label === "similar_cases");
    }
  );
});

describe("isAnswerResponse", () => {
  it.each(cases)("returns true only for answer (case: %s)", (label, response) => {
    expect(isAnswerResponse(response)).toBe(label === "answer");
  });
});
