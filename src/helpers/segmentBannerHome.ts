const segmentValue = "segment";

export function setValue(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(segmentValue, token);
  }
}

export function getValue(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(segmentValue);
  }
  return null;
}

export function deleteValue(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(segmentValue);
  }
}
