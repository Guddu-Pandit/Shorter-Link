"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchLinks,
  getSessionId,
  isValidUrl,
  shortenUrl,
  type ShortLink,
} from "@/lib/shortly";

export function ShortenSection() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  // Initialise session & load existing links from Supabase
  useEffect(() => {
    const sid = getSessionId();
    setSessionId(sid);

    if (sid) {
      fetchLinks(sid)
        .then(setLinks)
        .catch((err) => console.error("Failed to load links:", err));
    }
  }, []);

  const buildShortUrl = useCallback(
    (code: string) => {
      if (typeof window === "undefined") return code;
      return `${window.location.origin}/${code}`;
    },
    [],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please add a link");
      return;
    }
    if (!isValidUrl(trimmed)) {
      setError("Please enter a valid URL (include http:// or https://)");
      return;
    }

    setLoading(true);
    try {
      const entry = await shortenUrl(trimmed, sessionId);
      setLinks((prev) => [entry, ...prev]);
      setUrl("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(id: number, code: string) {
    await navigator.clipboard.writeText(buildShortUrl(code));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <section
      id="shorten"
      className="relative z-10 -mt-16 px-6 md:-mt-24 md:px-0"
    >
      <div className="mx-auto max-w-[69.375rem]">
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-[0.625rem] bg-shortly-dark-violet bg-[url('/bg-shorten-desktop.svg')] bg-cover bg-center p-6 md:flex md:items-start md:gap-4 md:p-14"
        >
          <div className="flex-1">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
              placeholder="Shorten a link here..."
              className={`w-full rounded-md px-4 py-4 text-base text-shortly-dark-violet placeholder:text-shortly-grayish-violet focus:outline-none md:py-5 md:pr-4 ${
                error ? "border-2 border-shortly-red" : "border-0"
              }`}
            />
            {error && (
              <p className="mt-2 text-left text-[0.8125rem] italic text-shortly-red">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full shrink-0 rounded-full bg-shortly-cyan px-6 py-4 text-base font-bold text-white transition-colors hover:bg-shortly-cyan-hover disabled:opacity-70 md:mt-0 md:w-auto md:px-10"
          >
            {loading ? "Shortening..." : "Shorten It!"}
          </button>
        </form>

        {links.length > 0 && (
          <ul className="mt-6 flex flex-col gap-4">
            {links.map((link) => (
              <li
                key={link.id}
                className="flex flex-col gap-4 rounded-md bg-white px-6 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:py-5"
              >
                <p className="truncate border-b border-shortly-light-grayish-blue pb-4 text-sm font-medium text-shortly-dark-violet md:max-w-[50%] md:border-b-0 md:pb-0">
                  {link.original_url}
                </p>
                <div className="flex shrink-0 items-center justify-between gap-4 md:justify-end">
                  <span className="hidden text-xs text-shortly-grayish-violet md:inline">
                    {link.clicks} click{link.clicks !== 1 ? "s" : ""}
                  </span>
                  <a
                    href={buildShortUrl(link.code)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-sm font-medium text-shortly-cyan hover:underline"
                  >
                    {buildShortUrl(link.code)}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(link.id, link.code)}
                    className={`shrink-0 rounded-md px-6 py-2 text-sm font-bold text-white transition-colors ${
                      copiedId === link.id
                        ? "bg-shortly-dark-violet"
                        : "bg-shortly-cyan hover:bg-shortly-cyan-hover"
                    }`}
                  >
                    {copiedId === link.id ? "Copied!" : "Copy"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
