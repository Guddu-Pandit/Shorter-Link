import React from "react";
import { Link as LinkIcon, MousePointer2, TrendingUp, Flame, Calendar } from "lucide-react";

export function DashboardStats() {
  return (
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
  );
}
