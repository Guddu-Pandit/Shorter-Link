"use client";

import React, { useEffect, useState } from "react";
import { Copy, Trash2, ExternalLink, Loader2, MousePointerClick, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type LinkData = {
  id: string;
  code: string;
  original_url: string;
  clicks: number;
  created_at: string;
};

export function LinksList({ refreshTrigger }: { refreshTrigger: number }) {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, [refreshTrigger]);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/links");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch links.");
      setLinks(data.links || []);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    try {
      const res = await fetch(`/api/links?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLinks(links.filter((l) => l.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete link.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting link.");
    }
  };

  const copyToClipboard = (code: string, id: string) => {
    const shortUrl = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-shortly-grayish-violet">
        <Loader2 className="w-8 h-8 animate-spin text-shortly-cyan mb-4" />
        <p>Loading your links...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-shortly-red/10 border border-shortly-red/20 rounded-xl p-6 text-center text-shortly-red">
        <p>{error}</p>
        <Button onClick={fetchLinks} variant="outline" className="mt-4 border-shortly-red/20 hover:bg-shortly-red/10">
          Try Again
        </Button>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="bg-white border-0 shadow-sm rounded-xl p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
          <ExternalLink className="w-8 h-8 text-shortly-grayish-violet" />
        </div>
        <h3 className="text-xl font-bold text-shortly-dark-violet mb-2">No links yet</h3>
        <p className="text-shortly-grayish-violet max-w-md">
          You haven't shortened any links yet. Use the form above to create your first short link!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-shortly-dark-violet flex items-center justify-between">
        Your Links
        <span className="text-xs font-medium bg-shortly-gray/20 px-2.5 py-1 rounded-full text-shortly-dark-violet">
          {links.length} Total
        </span>
      </h3>
      
      <div className="grid gap-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="group bg-white border-0 shadow-sm hover:shadow-md rounded-xl p-4 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <a
                  href={`/${link.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-shortly-cyan font-bold text-lg hover:underline truncate"
                >
                  shortly.com/{link.code}
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-shortly-grayish-violet hover:text-shortly-dark-violet shrink-0"
                  onClick={() => copyToClipboard(link.code, link.id)}
                >
                  {copiedId === link.id ? (
                    <CheckCircle2 className="w-4 h-4 text-shortly-cyan" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-shortly-dark-violet truncate" title={link.original_url}>
                {link.original_url}
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 pt-3 sm:pt-0 border-t border-gray-100 sm:border-0 mt-3 sm:mt-0">
              <div className="flex items-center gap-1.5 text-xs font-medium text-shortly-grayish-violet">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(link.created_at)}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-shortly-grayish-violet">
                <MousePointerClick className="w-3.5 h-3.5" />
                {link.clicks} clicks
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteLink(link.id)}
                className="w-8 h-8 text-shortly-grayish-violet hover:text-shortly-red hover:bg-shortly-red/10 ml-auto sm:ml-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
