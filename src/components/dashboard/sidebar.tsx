"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Settings, Link as LinkIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      if (res.ok) {
        router.refresh();
        router.push("/login");
      }
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Links", href: "/dashboard/links", icon: LinkIcon },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between p-4 flex-shrink-0 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-32 bg-shortly-cyan/5 blur-2xl rounded-full" />
      
      <div className="z-10">
        <Link href="/" className="inline-block text-2xl font-bold tracking-tight text-shortly-dark-violet mb-8 pl-2">
          Shortly<span className="text-shortly-cyan">.</span>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-shortly-cyan/10 text-shortly-cyan font-bold"
                    : "text-shortly-grayish-violet hover:bg-gray-50 hover:text-shortly-dark-violet"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-shortly-cyan" : "text-shortly-grayish-violet"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="z-10 space-y-4">
        <div className="bg-shortly-dark-violet p-4 rounded-xl shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-shortly-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h4 className="text-white text-sm font-bold mb-1 flex items-center gap-2">
            Premium Plan
            <Sparkles className="w-3 h-3 text-yellow-400" />
          </h4>
          <p className="text-xs text-shortly-grayish-violet mb-3">
            Upgrade to unlock unlimited links and custom aliases.
          </p>
          <Button className="w-full h-8 text-xs font-bold bg-shortly-cyan hover:bg-shortly-cyan/90 text-white rounded-lg shadow-[0_4px_14px_rgba(42,207,207,0.3)] transition-transform active:scale-95">
            Upgrade Now
          </Button>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-shortly-red hover:bg-shortly-red/10 transition-colors duration-300 font-medium group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
