'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  Bot, 
  Settings, 
  Activity, 
  Menu, 
  X, 
  Sparkles,
  Flame
} from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar drawer on route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/', label: 'Overview', icon: LayoutDashboard },
    { href: '/content', label: 'Content Hub', icon: FileText },
    { href: '/seo', label: 'Rank Tracker', icon: Search },
    { href: '/ai-citations', label: 'AI Citation Monitor', icon: Bot },
    { href: '/chat', label: 'AI Audit Assistant', icon: Sparkles, highlight: true },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/health', label: 'Health Status', icon: Activity },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-emerald-500 animate-pulse" />
          <span className="font-bold tracking-tight text-zinc-900 dark:text-white">FlyRank AI</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Slide-in drawer container */}
          <aside className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-850 p-6 animate-slide-in focus:outline-none">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-emerald-500" />
                <span className="font-bold tracking-tight text-zinc-900 dark:text-white text-lg">FlyRank AI</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? item.highlight
                          ? 'bg-emerald-500 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400'
                        : 'text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? '' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-850 p-6 z-25">
        <div className="flex items-center gap-2 mb-10">
          <Flame className="w-8 h-8 text-emerald-500" />
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-zinc-900 dark:text-white text-lg leading-tight">FlyRank AI</span>
            <span className="text-[10px] text-zinc-450 dark:text-zinc-500 font-semibold tracking-wider uppercase">SEO AUDITOR</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? item.highlight
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-emerald-50 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400'
                    : 'text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? '' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile footer indicator */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500/25 flex items-center justify-between p-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
            TY
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200">Talha Yaseen</span>
            <span className="text-[10px] text-zinc-500">SEO Intern</span>
          </div>
        </div>
      </aside>
    </>
  );
}
