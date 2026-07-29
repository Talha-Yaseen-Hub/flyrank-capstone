'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Info, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const [domain, setDomain] = useState('flyrank.ai');
  const [gscConnected, setGscConnected] = useState(true);
  const [theme, setTheme] = useState('dark');

  // Load theme preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);

  // Update theme dynamically
  const toggleTheme = (val) => {
    setTheme(val);
    if (typeof window !== 'undefined') {
      if (val === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">Platform Settings</h1>
        <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-1">
          Configure site domain preferences, API integration states, and theme choices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Settings forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Domain connection settings */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Domain Connection</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Tracked Domain</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-850 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Google Search Console Connected Successfully.</span>
                </div>
                <button 
                  onClick={() => setGscConnected(!gscConnected)}
                  className="font-bold underline cursor-pointer"
                >
                  {gscConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          </div>

          {/* Theme switcher */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Interface Customization</h2>
            <p className="text-xs text-zinc-550 dark:text-zinc-400">Select your preferred user interface color styling.</p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => toggleTheme('light')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-sm font-semibold transition-all ${
                  theme === 'light'
                    ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-550 hover:bg-zinc-50 dark:hover:bg-zinc-800/55'
                }`}
              >
                <Sun className="w-6 h-6 mb-2" />
                <span>Light Mode</span>
              </button>

              <button
                onClick={() => toggleTheme('dark')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-sm font-semibold transition-all ${
                  theme === 'dark'
                    ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-550 hover:bg-zinc-50 dark:hover:bg-zinc-800/55'
                }`}
              >
                <Moon className="w-6 h-6 mb-2" />
                <span>Dark Mode</span>
              </button>
            </div>
          </div>

        </div>

        {/* Informative Side Panel */}
        <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-4 h-fit">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Audit Limits</h2>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Standard SEO audit cycles are restricted to 1,000 pages per domain per month for your current internship sandbox credential.
          </p>
          <div className="pt-2">
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Quota Used</span>
              <span>180 / 1000 Pages</span>
            </div>
            <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-[18%] h-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
