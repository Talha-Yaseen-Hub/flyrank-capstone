import React from 'react';
import { ArrowUpRight, ArrowDownRight, Search, Plus } from 'lucide-react';

export default function RankTrackerPage() {
  const keywords = [
    { name: 'ai search optimization', position: 2, volume: '8,400', difficulty: 'Hard', change: '+3' },
    { name: 'llms structured schema', position: 8, volume: '1,200', difficulty: 'Medium', change: '+12' },
    { name: 'traditional seo vs llm', position: 1, volume: '3,200', difficulty: 'Easy', change: '0' },
    { name: 'automated audit checks', position: 14, volume: '5,600', difficulty: 'Hard', change: '-4' },
    { name: 'visibility dashboard chatbot', position: 5, volume: '950', difficulty: 'Medium', change: '+2' },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">Rank Tracker</h1>
          <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-1">
            Track search engine results page (SERP) positions for your focus search terms.
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <Plus className="w-4 h-4" />
          <span>Track Keyword</span>
        </button>
      </div>

      {/* Keywords analysis grid */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-850 text-xs font-semibold text-zinc-450 dark:text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-900/50">
                <th className="px-6 py-4">Search Term</th>
                <th className="px-6 py-4">SERP Rank</th>
                <th className="px-6 py-4">Search Volume</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4 text-right">Weekly Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-850">
              {keywords.map((k, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors text-sm">
                  <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                    {k.name}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-zinc-950 dark:text-zinc-200">
                    #{k.position}
                  </td>
                  <td className="px-6 py-4 text-zinc-550 dark:text-zinc-450">
                    {k.volume} / mo
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      k.difficulty === 'Easy' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : k.difficulty === 'Medium' 
                        ? 'bg-amber-500/10 text-amber-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {k.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 font-semibold">
                      {k.change.startsWith('+') ? (
                        <>
                          <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-500">{k.change}</span>
                        </>
                      ) : k.change.startsWith('-') ? (
                        <>
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                          <span className="text-red-500">{k.change}</span>
                        </>
                      ) : (
                        <span className="text-zinc-400">Stable</span>
                      )}
                    </div>
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
