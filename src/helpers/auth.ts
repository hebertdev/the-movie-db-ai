import cookie from "js-cookie";

const token_key = "id";

export function setToken(token: string): void {
  cookie.set(token_key, token);
}

export function getToken(): string | undefined {
  return cookie.get(token_key);
}

export function deleteToken(): void {
  cookie.remove(token_key);
}
