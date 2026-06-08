"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Link as LinkIcon, LayoutDashboard, BarChart, Settings, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function DashboardSidebar() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUserName(data.user.name);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-brand">
        <div className="dashboard-brand-icon"><LinkIcon size={16} /></div>
        <span className="dashboard-brand-name">Shortly</span>
      </div>
      <Link href="/dashboard" className={`dashboard-nav-item ${pathname === "/dashboard" ? "active" : ""}`}>
        <LayoutDashboard size={16} />Dashboard
      </Link>
      <Link href="/dashboard/links" className={`dashboard-nav-item ${pathname === "/dashboard/links" ? "active" : ""}`}>
        <LinkIcon size={16} />My links
      </Link>
      <Link href="/dashboard/analytics" className={`dashboard-nav-item ${pathname === "/dashboard/analytics" ? "active" : ""}`}>
        <BarChart size={16} />Analytics
      </Link>
      <div className="dashboard-nav-section">Session</div>
      <Link href="/dashboard/preferences" className={`dashboard-nav-item ${pathname === "/dashboard/preferences" ? "active" : ""}`}>
        <Settings size={16} />Preferences
      </Link>
      <div className="dashboard-sidebar-footer">
        <div className="dashboard-session-dot" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div className="dashboard-dot" style={{ background: userName ? '#1d9e75' : '#ccc' }}></div>
            <span style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userName ? userName : "Anonymous session"}
            </span>
          </div>
          {userName && (
            <button 
              onClick={handleLogout} 
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
