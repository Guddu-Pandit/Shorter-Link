"use client";

import React from "react";
import "./dashboard.css";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { DashboardShortenCard } from "@/components/dashboard/dashboard-shorten-card";
import { DashboardLinksTable } from "@/components/dashboard/dashboard-links-table";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";

export default function DashboardPage() {
  return (
    <div className="dashboard-root">
      <DashboardSidebar />

      <main className="dashboard-main">
        <div className="dashboard-page-header">
          <div>
            <div className="dashboard-page-title">Dashboard</div>
            <div className="dashboard-page-sub">Monday, 8 Jun 2026</div>
          </div>
        </div>

        <DashboardStats />
        <DashboardShortenCard />
        <DashboardLinksTable />
        <DashboardCharts />
      </main>
    </div>
  );
}

