import React from "react";
import { redirect } from "next/navigation";
import { getAuthCookie } from "@/lib/cookie";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAuthCookie();

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-[#f0f1f6] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-8 max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
