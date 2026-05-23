export type ShortLink = {
  id: number;
  code: string;
  original_url: string;
  clicks: number;
  created_at: string;
};

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const SESSION_KEY = "shortly-session-id";

/** Get or create a persistent anonymous session ID */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** Shorten a URL via our API */
export async function shortenUrl(
  url: string,
  sessionId: string,
): Promise<ShortLink> {
  const res = await fetch("/api/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, sessionId }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? "Something went wrong");
  }
  return data as ShortLink;
}

/** Fetch all links for the current session */
export async function fetchLinks(sessionId: string): Promise<ShortLink[]> {
  const res = await fetch(`/api/links?sessionId=${encodeURIComponent(sessionId)}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? "Failed to load links");
  }
  return data.links as ShortLink[];
}

/** Delete a shortened link */
export async function deleteLink(
  id: number,
  sessionId: string,
): Promise<void> {
  const res = await fetch(
    `/api/links?id=${id}&sessionId=${encodeURIComponent(sessionId)}`,
    {
      method: "DELETE",
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? "Failed to delete link");
  }
}

