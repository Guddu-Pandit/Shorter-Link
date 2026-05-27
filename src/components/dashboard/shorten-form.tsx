"use client";

import React, { useState } from "react";
import { Link2, Loader2, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function ShortenForm({ onLinkAdded }: { onLinkAdded?: () => void }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessCode(null);
    setLimitReached(false);
    
    if (!url) return;

    try {
      // Basic client-side validation
      new URL(url);
    } catch {
      setError("Please enter a valid URL (e.g. https://example.com)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.limitReached) {
          setLimitReached(true);
        }
        throw new Error(data.error || "Failed to shorten link.");
      }

      setSuccessCode(data.code);
      setUrl("");
      if (onLinkAdded) onLinkAdded();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!successCode) return;
    const shortUrl = `${window.location.origin}/${successCode}`;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-white/5 border-white/10 shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-shortly-cyan/5 to-transparent pointer-events-none" />
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Link2 className="w-5 h-5 text-shortly-cyan" />
              Shorten a new link
            </h2>
            <p className="text-sm text-shortly-grayish-violet">
              Paste your long URL below to create a trackable short link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative flex items-center gap-3 w-full">
            <div className="relative flex-1">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-shortly-grayish-violet" />
              <Input
                type="text"
                placeholder="https://your-long-url.com/very/long/path"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading || limitReached}
                className="w-full h-14 pl-12 pr-4 bg-white/5 border-white/10 text-white placeholder:text-shortly-grayish-violet focus-visible:ring-shortly-cyan focus-visible:border-shortly-cyan transition-all text-base rounded-xl"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || limitReached}
              className="h-14 px-8 font-bold bg-shortly-cyan hover:bg-shortly-cyan/90 text-white rounded-xl shadow-[0_4px_14px_rgba(42,207,207,0.3)] transition-transform active:scale-95 whitespace-nowrap"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Shorten"}
            </Button>
          </form>

          {error && !limitReached && (
            <div className="text-shortly-red text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {limitReached && (
            <div className="bg-shortly-red/10 border border-shortly-red/20 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between animate-in fade-in zoom-in-95">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-shortly-red shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">Limit Reached</h4>
                  <p className="text-shortly-grayish-violet text-xs mt-1">
                    You've reached the 3-link limit for the free tier. Upgrade your plan to create unlimited links.
                  </p>
                </div>
              </div>
              <Button className="shrink-0 font-bold bg-white text-shortly-very-dark-violet hover:bg-gray-200">
                Upgrade Plan
              </Button>
            </div>
          )}

          {successCode && (
            <div className="bg-shortly-cyan/10 border border-shortly-cyan/20 rounded-xl p-4 flex items-center justify-between animate-in fade-in zoom-in-95 mt-2">
              <div className="flex flex-col">
                <span className="text-xs text-shortly-grayish-violet mb-1">Success! Your short link:</span>
                <span className="text-white font-medium break-all">
                  {window.location.origin}/{successCode}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className={`ml-4 shrink-0 transition-all ${
                  copied ? "text-shortly-cyan hover:text-shortly-cyan" : "text-shortly-grayish-violet hover:text-white"
                }`}
              >
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
