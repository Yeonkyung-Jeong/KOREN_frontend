import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiService, ChatApiResponse } from "./api";

describe("apiService.sendChatMessage", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("resolves with the parsed response on success and sends the expected request", async () => {
    const mockResponse: ChatApiResponse = {
      session_id: "patient-1:abc",
      response: { type: "answer", answer_text: "답변", citations: [] },
    };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.sendChatMessage(
      "patient-1",
      "질문입니다",
      "patient-1:abc"
    );

    expect(result).toEqual(mockResponse);
    const [url, options] = (global.fetch as ReturnType<typeof vi.fn>).mock
      .calls[0];
    expect(url).toContain("/patients/patient-1/chat");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({
      message: "질문입니다",
      session_id: "patient-1:abc",
    });
  });

  it("serializes session_id as null when omitted", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        session_id: "patient-1:new",
        response: { type: "answer", answer_text: "답변", citations: [] },
      }),
    });

    await apiService.sendChatMessage("patient-1", "첫 질문");

    const [, options] = (global.fetch as ReturnType<typeof vi.fn>).mock
      .calls[0];
    expect(JSON.parse(options.body)).toEqual({
      message: "첫 질문",
      session_id: null,
    });
  });

  it("throws a generic Error without parsing the detail field on failure", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: async () => ({ detail: "환자를 찾을 수 없습니다" }),
    });

    await expect(
      apiService.sendChatMessage("patient-404", "질문")
    ).rejects.toThrow("API 요청 실패: 404 Not Found");
  });
});
