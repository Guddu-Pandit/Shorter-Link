"use client";

import React, { useState } from "react";
import { ShortenForm } from "@/components/dashboard/shorten-form";
import { LinksList } from "@/components/dashboard/links-list";

export default function DashboardPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLinkAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-shortly-dark-violet mb-2">Dashboard</h1>
        <p className="text-shortly-grayish-violet">
          Manage your shortened links and track performance.
        </p>
      </header>

      <section>
        <ShortenForm onLinkAdded={handleLinkAdded} />
      </section>

      <section className="pt-4">
        <LinksList refreshTrigger={refreshTrigger} />
      </section>
    </div>
  );
}
