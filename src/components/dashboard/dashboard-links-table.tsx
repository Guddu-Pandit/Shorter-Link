"use client";

import React, { useState } from "react";
import { Search, ExternalLink, MousePointer2, Copy, Trash, Check } from "lucide-react";

export function DashboardLinksTable() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 1800);
  };

  const links = [
    { orig: "https://github.com/Guddu-Pandit/Shorter-Link/blob/main/README.md", short: "sho.rt/a3xf", clicks: 91, date: "Jun 6", hot: true },
    { orig: "https://www.npmjs.com/package/supabase-js", short: "sho.rt/b7kq", clicks: 44, date: "Jun 5", hot: false },
    { orig: "https://tailwindcss.com/docs/installation/using-vite", short: "sho.rt/c1mz", clicks: 27, date: "Jun 4", hot: false },
    { orig: "https://nextjs.org/docs/app/building-your-application/routing", short: "sho.rt/d9pv", clicks: 18, date: "Jun 3", hot: false },
  ];

  const filteredLinks = links.filter(l => 
    l.orig.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.short.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-links-card">
      <div className="dashboard-links-top">
        <div className="dashboard-links-top-left">
          <span className="dashboard-card-label">Your links</span>
          <span className="dashboard-count-badge">{links.length}</span>
        </div>
        <div className="dashboard-search-wrap">
          <Search size={14} />
          <input 
            type="text" 
            placeholder="Search links…" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <table className="dashboard-tbl">
        <colgroup>
          <col className="dashboard-col-url" />
          <col className="dashboard-col-short" />
          <col className="dashboard-col-clicks" />
          <col className="dashboard-col-date" />
          <col className="dashboard-col-actions" />
        </colgroup>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short link</th>
            <th>Clicks</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLinks.map((link, idx) => (
            <tr key={idx}>
              <td><div className="dashboard-orig-url" title={link.orig}>{link.orig}</div></td>
              <td>
                <span className="dashboard-short-link">
                  <ExternalLink size={12} />{link.short}
                </span>
              </td>
              <td>
                <span className={`dashboard-click-pill ${link.hot ? 'hot' : ''}`}>
                  <MousePointer2 size={12} />{link.clicks}
                </span>
              </td>
              <td><span className="dashboard-date-text">{link.date}</span></td>
              <td>
                <div className="dashboard-action-btns">
                  <button 
                    className={`dashboard-icon-btn ${copiedLink === link.short ? 'copied' : ''}`} 
                    aria-label="Copy link" 
                    onClick={() => handleCopy(link.short)}
                  >
                    {copiedLink === link.short ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button className="dashboard-icon-btn del" aria-label="Delete link">
                    <Trash size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
