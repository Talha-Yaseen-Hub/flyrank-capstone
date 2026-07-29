import React from 'react';
import { Search, ChevronRight, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ContentHubPage() {
  const pages = [
    { path: '/blog/why-ai-search-matters', score: 92, keywords: 14, status: 'good', label: 'Good' },
    { path: '/products/seo-auditor', score: 85, keywords: 22, status: 'good', label: 'Good' },
    { path: '/blog/structured-data-for-llms', score: 58, keywords: 8, status: 'warning', label: 'Needs Optimization' },
    { path: '/pricing', score: 71, keywords: 5, status: 'good', label: 'Good' },
    { path: '/about-us', score: 44, keywords: 3, status: 'warning', label: 'Low Score' },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">Content Hub</h1>
        <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-1">
          Audit the content quality score and search engine visibility tags of individual site pages.
        </p>
      </div>

      {/* Filter and Search Action */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-850 rounded-xl shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-450" />
          <input
            type="text"
            placeholder="Search pages by path or keywords..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-850 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <select className="text-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>All Scores</option>
            <option>Critical (Under 60)</option>
            <option>Good (80+)</option>
          </select>
        </div>
      </div>

      {/* Pages table list */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-850 text-xs font-semibold text-zinc-450 dark:text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-900/50">
                <th className="px-6 py-4">Page Path</th>
                <th className="px-6 py-4">Health Score</th>
                <th className="px-6 py-4">Tracked Keywords</th>
                <th className="px-6 py-4">Audit Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-850">
              {pages.map((p, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors text-sm">
                  <td className="px-6 py-4 font-mono text-xs text-zinc-650 dark:text-zinc-300">
                    {p.path}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${p.score >= 80 ? 'text-emerald-500' : p.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                        {p.score}%
                      </span>
                      <div className="w-16 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${p.score}%` }} 
                          className={`h-full ${p.score >= 80 ? 'bg-emerald-500' : p.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                    {p.keywords}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {p.status === 'good' ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                      )}
                      <span className="text-xs">{p.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href="/chat"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500 hover:text-emerald-600 focus:outline-none"
                    >
                      <span>Optimize page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
