import React from "react";
import { redirect } from "next/navigation";
import { getAuthCookie } from "@/lib/cookie";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAuthCookie();

  if (!token) {
    redirect("/login");
  }

  return <>{children}</>;
}
