import React from 'react';
import { Activity, ShieldAlert, Cpu, Database } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function fetchHealthProxyData() {
  const start = Date.now();
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      cache: 'no-store',
    });
    
    if (!res.ok) throw new Error('API request failed');
    
    const data = await res.json();
    const latency = Date.now() - start;
    
    return {
      status: 'Healthy',
      latency: `${latency}ms`,
      data: data,
    };
  } catch (err) {
    return {
      status: 'Degraded',
      latency: 'Timeout/Error',
      data: null,
      error: err.message,
    };
  }
}

export default async function HealthPage() {
  const healthInfo = await fetchHealthProxyData();

  const services = [
    { name: 'Core Audit Engine', status: 'Online', icon: Cpu, desc: 'V2 dynamic crawler parses content structures.' },
    { name: 'Metadata Validator', status: 'Online', icon: ShieldAlert, desc: 'Tracks character thresholds on title & description tags.' },
    { name: 'Keyword Tracker DB', status: 'Online', icon: Database, desc: 'Caches keyword positions indexes.' },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">System Health</h1>
        <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-1">
          Server-side health status and dynamic external API response diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core dynamic check status panel */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">External API Health Check</h2>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              healthInfo.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
            }`}>
              {healthInfo.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 rounded-lg">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Latency</span>
              <span className="text-lg font-bold text-zinc-900 dark:text-white">{healthInfo.latency}</span>
            </div>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 rounded-lg">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Target Endpoint</span>
              <span className="text-xs font-mono truncate block text-zinc-650 dark:text-zinc-300">jsonplaceholder.typicode.com</span>
            </div>
          </div>

          {/* Renders dynamic fetched content */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">Fetched Verification payload</span>
            {healthInfo.data ? (
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs leading-relaxed font-mono text-zinc-700 dark:text-zinc-300">
                <div><span className="text-purple-400 font-semibold">"id":</span> {healthInfo.data.id}</div>
                <div><span className="text-purple-400 font-semibold">"title":</span> "{healthInfo.data.title.substring(0, 50)}..."</div>
                <div className="mt-1"><span className="text-purple-400 font-semibold">"status":</span> "Successfully parsed server payload"</div>
              </div>
            ) : (
              <div className="p-4 bg-red-500/10 text-red-500 rounded-lg text-xs font-mono">
                Error retrieving proxy content: {healthInfo.error}
              </div>
            )}
          </div>
        </div>

        {/* Server metrics side card */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-4 shadow-xs">
            <h3 className="font-bold text-zinc-900 dark:text-white">Active Auditing Subsystems</h3>
            
            <div className="space-y-4">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <div key={i} className="flex gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg h-fit">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200">{svc.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-[10px] text-zinc-500 leading-normal">{svc.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
