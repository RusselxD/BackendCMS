'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UserCircle,
  CheckCircle2,
  Settings,
  Users,
  BookOpen,
  GraduationCap
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
  ];

  const contentItems = [
    { name: "Home Settings", path: "/home-settings", icon: Settings },
    { name: "Academics", path: "/academics-settings", icon: BookOpen },
    { name: "Administrator", path: "/administrator-settings", icon: Users },
    { name: "Curriculum", path: "/programs", icon: GraduationCap },
  ];

  const getPageInfo = () => {
    const current =
      navItems.find((item) => item.path === pathname) ||
      contentItems.find((item) => item.path === pathname);

    if (pathname === "/approvals") {
      return { name: "Approval" };
    }

    if (!current) {
       return { name: "Dashboard" };
    }

    return {
      name: current.name
    };
  };

  const { name: pageTitle } = getPageInfo();

  return (
    <div className="flex h-dvh min-h-dvh bg-slate-100">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-slate-950 text-white flex flex-col shrink-0 border-r border-slate-800">
        <div className="px-4 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-semibold text-white text-sm">E</div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-slate-100">CEIT CMS</h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Administration</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium">University Engineering</p>
        </div>
        
        <nav className="flex-1 py-3 overflow-y-auto">
          <div className="px-4 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-[0.12em]">Management</div>
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "group flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors border",
                    pathname === item.path
                      ? "bg-blue-600 text-white border-blue-500"
                      : "text-slate-300 border-transparent hover:text-white hover:bg-slate-900 hover:border-slate-800"
                  )}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0 text-slate-300 group-hover:text-white" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mx-4 h-px bg-slate-800 my-4" />

          <div className="px-4 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-[0.12em]">Content Management</div>
          <ul className="space-y-1 px-3">
            {contentItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "group flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors border",
                    pathname === item.path
                      ? "bg-blue-600 text-white border-blue-500"
                      : "text-slate-300 border-transparent hover:text-white hover:bg-slate-900 hover:border-slate-800"
                  )}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0 text-slate-300 group-hover:text-white" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mx-4 h-px bg-slate-800 my-4" />

          <div className="px-4 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-[0.12em]">Admin Controls</div>
          <ul className="space-y-1 px-3">
            <li>
              <Link
                href="/approvals"
                className={cn(
                  "group flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors border",
                  pathname === "/approvals"
                    ? "bg-blue-600 text-white border-blue-500"
                    : "text-slate-300 border-transparent hover:text-white hover:bg-slate-900 hover:border-slate-800"
                )}
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-slate-300 group-hover:text-white" />
                <span className="text-sm font-medium">Approval</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-slate-200">N</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-100 truncate">Dr. John Doe</p>
              <span className="text-[10px] px-1.5 py-0.5 bg-blue-600/20 text-blue-300 border border-blue-700/50 rounded font-medium inline-block">Admin</span>
            </div>
            <UserCircle className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-slate-900">{pageTitle}</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-medium text-slate-500">System active</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-5 bg-slate-100">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
