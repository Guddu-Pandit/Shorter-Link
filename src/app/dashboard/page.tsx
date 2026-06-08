"use client";

import React, { useState } from "react";
import "./dashboard.css";
import { 
  Link as LinkIcon, 
  LayoutDashboard, 
  BarChart, 
  Settings, 
  TrendingUp, 
  Flame, 
  Calendar, 
  Zap, 
  Search, 
  ExternalLink, 
  MousePointer2, 
  Copy, 
  Trash,
  Check
} from "lucide-react";

export default function DashboardPage() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 1800);
  };

  const handleShorten = () => {
    if (!urlInput.trim()) return;
    setIsShortening(true);
    setTimeout(() => {
      setIsShortening(false);
      setUrlInput("");
    }, 2000);
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
    <div className="dashboard-root">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon"><LinkIcon size={16} /></div>
          <span className="dashboard-brand-name">Shortly</span>
        </div>
        <div className="dashboard-nav-item active"><LayoutDashboard size={16} />Dashboard</div>
        <div className="dashboard-nav-item"><LinkIcon size={16} />My links</div>
        <div className="dashboard-nav-item"><BarChart size={16} />Analytics</div>
        <div className="dashboard-nav-section">Session</div>
        <div className="dashboard-nav-item"><Settings size={16} />Preferences</div>
        <div className="dashboard-sidebar-footer">
          <div className="dashboard-session-dot"><div className="dashboard-dot"></div><span>Anonymous session</span></div>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-page-header">
          <div>
            <div className="dashboard-page-title">Dashboard</div>
            <div className="dashboard-page-sub">Monday, 8 Jun 2026</div>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <div className="dashboard-stat-icon purple"><LinkIcon size={18} /></div>
            <div className="dashboard-stat-num">12</div>
            <div className="dashboard-stat-label">Total links</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-icon teal"><MousePointer2 size={18} /></div>
            <div className="dashboard-stat-num">284</div>
            <div className="dashboard-stat-label">Total clicks</div>
            <div className="dashboard-stat-trend"><TrendingUp size={12} />+38 this week</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-icon amber"><Flame size={18} /></div>
            <div className="dashboard-stat-num" style={{ fontSize: '15px', paddingTop: '4px', fontFamily: 'var(--font-mono)' }}>sho.rt/a3xf</div>
            <div className="dashboard-stat-label">Top link · 91 clicks</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-icon blue"><Calendar size={18} /></div>
            <div className="dashboard-stat-num">3</div>
            <div className="dashboard-stat-label">Created today</div>
          </div>
        </div>

        <div className="dashboard-shorten-card">
          <div className="dashboard-card-label">Shorten a new link</div>
          <div className="dashboard-card-sub">Paste any URL and get a short link instantly</div>
          <div className="dashboard-input-row">
            <input 
              className="dashboard-url-input" 
              type="text" 
              placeholder="https://your-long-url.com/goes/here…" 
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <button 
              className="dashboard-btn-shorten" 
              onClick={handleShorten}
              style={isShortening ? { background: '#1d9e75' } : {}}
            >
              {isShortening ? <Check size={15} /> : <Zap size={15} />}
              {isShortening ? "Shortened!" : "Shorten"}
            </button>
          </div>
        </div>

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

        <div className="dashboard-bottom-grid">
          <div className="dashboard-chart-card">
            <div className="dashboard-section-title">Clicks — last 7 days</div>
            <div className="dashboard-section-sub">Daily click activity</div>
            <div className="dashboard-chart-bars">
              <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '34px'}}></div><span className="dashboard-bar-lbl">M</span></div>
              <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '52px'}}></div><span className="dashboard-bar-lbl">T</span></div>
              <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '28px'}}></div><span className="dashboard-bar-lbl">W</span></div>
              <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '62px'}}></div><span className="dashboard-bar-lbl">T</span></div>
              <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '44px'}}></div><span className="dashboard-bar-lbl">F</span></div>
              <div className="dashboard-bar-col"><div className="dashboard-bar" style={{height: '70px'}}></div><span className="dashboard-bar-lbl">S</span></div>
              <div className="dashboard-bar-col"><div className="dashboard-bar today" style={{height: '38px'}}></div><span className="dashboard-bar-lbl" style={{color: '#534AB7', fontWeight: 500}}>S</span></div>
            </div>
          </div>

          <div className="dashboard-top-links-card">
            <div className="dashboard-section-title">Top links</div>
            <div className="dashboard-section-sub">By total clicks</div>
            <div style={{marginTop: '12px'}}>
              <div className="dashboard-top-link-row">
                <span className="dashboard-rank">1</span>
                <span className="dashboard-tl-code">sho.rt/a3xf</span>
                <div className="dashboard-tl-bar-wrap"><div className="dashboard-tl-bar" style={{width: '100%'}}></div></div>
                <span className="dashboard-tl-count">91</span>
              </div>
              <div className="dashboard-top-link-row">
                <span className="dashboard-rank">2</span>
                <span className="dashboard-tl-code">sho.rt/b7kq</span>
                <div className="dashboard-tl-bar-wrap"><div className="dashboard-tl-bar" style={{width: '48%'}}></div></div>
                <span className="dashboard-tl-count">44</span>
              </div>
              <div className="dashboard-top-link-row">
                <span className="dashboard-rank">3</span>
                <span className="dashboard-tl-code">sho.rt/c1mz</span>
                <div className="dashboard-tl-bar-wrap"><div className="dashboard-tl-bar" style={{width: '30%'}}></div></div>
                <span className="dashboard-tl-count">27</span>
              </div>
              <div className="dashboard-top-link-row">
                <span className="dashboard-rank">4</span>
                <span className="dashboard-tl-code">sho.rt/d9pv</span>
                <div className="dashboard-tl-bar-wrap"><div className="dashboard-tl-bar" style={{width: '20%'}}></div></div>
                <span className="dashboard-tl-count">18</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
