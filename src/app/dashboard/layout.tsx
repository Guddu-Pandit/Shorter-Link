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
    <div className="flex h-screen bg-shortly-very-dark-violet overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-shortly-dark-violet via-shortly-very-dark-violet to-black -z-10" />
        <div className="p-8 max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
