import React from 'react';
import { TrendingUp, Award, Activity, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function OverviewPage() {
  const kpis = [
    { label: 'Organic Traffic', value: '45,230', change: '+12.4%', color: 'text-emerald-500', icon: TrendingUp },
    { label: 'Search Visibility', value: '74.2%', change: '+3.1%', color: 'text-blue-500', icon: Search },
    { label: 'AI Citations Share', value: '18.9%', change: '+5.7%', color: 'text-purple-500', icon: Award },
    { label: 'Site Health Score', value: '88/100', change: 'Stable', color: 'text-amber-500', icon: Activity },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">Dashboard Overview</h1>
          <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-1">
            Real-time traditional and AI-engine visibility metrics for your website.
          </p>
        </div>
        <Link 
          href="/chat"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start AI SEO Audit</span>
        </Link>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={idx} 
              className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">
                  {kpi.label}
                </span>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white font-display">
                  {kpi.value}
                </span>
                <span className={`text-xs font-bold ${kpi.change.startsWith('+') ? 'text-emerald-500' : 'text-zinc-450'}`}>
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trafffic chart panel mock */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Organic Traffic Trend</h2>
            <select className="text-xs border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          {/* Simulated chart */}
          <div className="h-64 flex items-end justify-between gap-2 pt-4">
            {[40, 55, 45, 60, 75, 50, 70, 85, 90, 80, 95, 100].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full h-48 flex items-end bg-transparent">
                  <div 
                    style={{ height: `${val}%` }} 
                    className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 hover:bg-emerald-500/45 rounded-xs transition-colors relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-sm">
                      {val * 450} visits
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-400 mt-2">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action checklist mock */}
        <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Audit Tasks Alert</h2>
          <p className="text-xs text-zinc-500">Actions suggested by our AI Audit Engine.</p>
          
          <div className="space-y-3 pt-2">
            {[
              { text: 'Add structured JSON-LD data to product templates', label: 'Schema', color: 'bg-red-500/10 text-red-500' },
              { text: 'Deploy an llms.txt at root for AI crawlers info', label: 'AI Bots', color: 'bg-purple-500/10 text-purple-500' },
              { text: 'Resolve meta description lengths on 12 key blogs', label: 'Meta', color: 'bg-amber-500/10 text-amber-500' },
            ].map((task, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/55 rounded-lg border border-zinc-100 dark:border-zinc-850 transition-colors">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${task.color} shrink-0 uppercase tracking-wider`}>
                  {task.label}
                </span>
                <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-tight">
                  {task.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
