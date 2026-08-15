const KEY_PREFIX = "koren:chat-session:";

export function getStoredSessionId(patientId: string): string | null {
  try {
    return localStorage.getItem(`${KEY_PREFIX}${patientId}`);
  } catch {
    return null;
  }
}

export function setStoredSessionId(patientId: string, sessionId: string): void {
  try {
    localStorage.setItem(`${KEY_PREFIX}${patientId}`, sessionId);
  } catch {
    // localStorage 접근 불가(프라이빗 모드 등) 시 세션 유지 기능만 못 쓸 뿐 채팅 자체는 계속 동작해야 함
  }
}
