const token_key = "openai_key";

export function setTokenOpenai(token: string): void {
  localStorage.setItem(token_key, token);
}

export function getTokenOpenai(): string | null {
  return localStorage.getItem(token_key);
}

export function deleteTokenOpenai(): void {
  localStorage.removeItem(token_key);
}
