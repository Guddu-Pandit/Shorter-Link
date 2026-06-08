import React from "react";
import { Link as LinkIcon, LayoutDashboard, BarChart, Settings } from "lucide-react";

export function DashboardSidebar() {
  return (
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
  );
}
