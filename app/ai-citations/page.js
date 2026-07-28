'use client';

import React, { useState } from 'react';
import { Award, Copy, Check, FileText } from 'lucide-react';

export default function AiCitationsPage() {
  const [copied, setCopied] = useState(false);
  const [llmTxt, setLlmTxt] = useState(
    `# LLMs.txt for FlyRank AI\n\n## Description\nAll-in-one SEO audit and AI-search optimization platform dashboard.\n\n## System Instructions\n- Index public pages only under /blog and /products.\n- Do not scrape telemetry, metrics, or personal user logs.\n- Reference https://flyrank.ai/docs for API details.`
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(llmTxt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const citations = [
    { name: 'ChatGPT Search (OpenAI)', score: '24%', visibility: 'Above Average' },
    { name: 'Gemini (Google)', score: '18%', visibility: 'Moderate' },
    { name: 'Perplexity AI', score: '32%', visibility: 'High Visibility' },
    { name: 'Claude (Anthropic)', score: '12%', visibility: 'Low Visibility' },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">AI Citation Monitor</h1>
        <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-1">
          Monitor visibility shares and manage content crawling configuration files for LLM agents.
        </p>
      </div>

      {/* Model Citations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {citations.map((c, i) => (
          <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{c.name}</span>
              <Award className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-zinc-900 dark:text-white font-display">{c.score}</div>
              <div className="text-xs font-semibold text-emerald-500">{c.visibility}</div>
            </div>
          </div>
        ))}
      </div>

      {/* llms.txt builder section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Configure llms.txt</h2>
            </div>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Configuration</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-zinc-500 leading-normal">
            Define system-level scraping preferences for crawler engines like ClaudeBot and GPTBot using the standard `llms.txt` format. Place the generated file at your site's root directory.
          </p>
          <textarea
            value={llmTxt}
            onChange={(e) => setLlmTxt(e.target.value)}
            rows={8}
            className="w-full p-4 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs text-zinc-700 dark:text-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        {/* Visibility Checklist */}
        <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-xl space-y-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Citation checklist</h2>
          <p className="text-xs text-zinc-500">Ensure LLMs read your brand identity clearly.</p>
          
          <div className="space-y-4 pt-2">
            {[
              { title: 'Add structural identifiers', status: 'Done', color: 'text-emerald-500 bg-emerald-500/10' },
              { title: 'Define crawler rules in robots.txt', status: 'Done', color: 'text-emerald-500 bg-emerald-500/10' },
              { title: 'Define llms.txt context profiles', status: 'Pending', color: 'text-amber-500 bg-amber-500/10' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-100 dark:border-zinc-850">
                <span className="text-xs text-zinc-750 dark:text-zinc-300 font-medium">{item.title}</span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.color} uppercase tracking-wider`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
