export type ShortLink = {
  id: string;
  original: string;
  short: string;
};

const STORAGE_KEY = "shortly-links";

export function loadLinks(): ShortLink[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ShortLink[]) : [];
  } catch {
    return [];
  }
}

export function saveLinks(links: ShortLink[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function shortenUrl(url: string): Promise<string> {
  const res = await fetch(
    `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`,
  );
  const data = await res.json();
  if (!res.ok || data.ok === false) {
    throw new Error(data.error ?? "Something went wrong");
  }
  return data.result.full_short_link as string;
}
