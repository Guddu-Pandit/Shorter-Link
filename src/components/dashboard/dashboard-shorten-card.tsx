"use client";

import React, { useState } from "react";
import { Zap, Check } from "lucide-react";

export function DashboardShortenCard() {
  const [isShortening, setIsShortening] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleShorten = () => {
    if (!urlInput.trim()) return;
    setIsShortening(true);
    setTimeout(() => {
      setIsShortening(false);
      setUrlInput("");
    }, 2000);
  };

  return (
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
  );
}
