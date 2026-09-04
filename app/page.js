'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Square,
  FileText, 
  Code, 
  Calendar, 
  Mail, 
  UserCheck, 
  CheckCircle,
  ArrowRight,
  Monitor,
  Github,
  Award,
  Terminal,
  Play,
  RotateCcw,
  Copy,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';

export default function PremiumPortfolioLandingPage() {
  // 1. AI Agent Chat State
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I am Talha Yaseen's Personal AI Representative. Ask me about Talha's skills, coding principles, unit test standards, or how to schedule an interview!",
      status: 'done'
    }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  const scrollContainerRef = useRef(null);
  const abortControllerRef = useRef(null);

  // 2. Vitest Simulator State
  const [testStatus, setTestStatus] = useState('idle'); // 'idle' | 'running' | 'completed'
  const [testLogs, setTestLogs] = useState([]);
  const [testProgress, setTestProgress] = useState(0);

  // 3. Code Drawer State
  const [activeCodeDrawer, setActiveCodeDrawer] = useState(null); // null | 'planner' | 'mvc'

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Chat Handler
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMsg = { role: 'user', content: input.trim(), status: 'done' };
    setInput('');
    setIsGenerating(true);

    setMessages(prev => [...prev, userMsg, { role: 'assistant', content: '', status: 'thinking' }]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          agentType: 'portfolio'
        }),
        signal: controller.signal
      });

      if (!response.ok) throw new Error('API Error');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const token = decoder.decode(value);
        text += token;

        setMessages(prev => {
          const list = [...prev];
          const last = list[list.length - 1];
          if (last && last.role === 'assistant') {
            last.status = 'streaming';
            last.content = text;
          }
          return list;
        });
      }

      setMessages(prev => {
        const list = [...prev];
        const last = list[list.length - 1];
        if (last && last.role === 'assistant') {
          last.status = 'done';
        }
        return list;
      });

    } catch (err) {
      if (err.name === 'AbortError') {
        setMessages(prev => {
          const list = [...prev];
          const last = list[list.length - 1];
          if (last && last.role === 'assistant') last.status = 'stopped';
          return list;
        });
      } else {
        setMessages(prev => {
          const list = [...prev];
          const last = list[list.length - 1];
          if (last && last.role === 'assistant') {
            last.status = 'error';
            last.content = 'I encountered an error connecting to the agent backend. Please try again.';
          }
          return list;
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Vitest Simulation Script
  const runVitestSimulation = () => {
    setTestStatus('running');
    setTestLogs([]);
    setTestProgress(0);

    const steps = [
      { log: '⚡ vitest run SettingsForm.test.jsx', progress: 5 },
      { log: '🔎 Finding component source and mapping imports...', progress: 15 },
      { log: '📦 Running test suite JSDOM container...', progress: 25 },
      { log: ' ✓ SettingsForm.test.jsx (16 tests passed)', progress: 35 },
      { log: '   ✓ Field Validation Constraints', progress: 45 },
      { log: '     ✓ should allow alphanumeric usernames of valid length (3-20) (14ms)', progress: 55 },
      { log: '     ✓ should reject short usernames (6ms)', progress: 65 },
      { log: '     ✓ should validate password complexity regex (11ms)', progress: 75 },
      { log: '     ✓ should cap bio text content at 160 characters (4ms)', progress: 80 },
      { log: '   ✓ Accessibility Linkages', progress: 85 },
      { log: '     ✓ should match aria-describedby and error elements (9ms)', progress: 90 },
      { log: '     ✓ should set aria-invalid="true" dynamically (5ms)', progress: 95 },
      { log: '🎉 Test Files: 1 passed | Tests: 16 passed | Time: 1.15s', progress: 100 }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTestLogs(prev => [...prev, step.log]);
        setTestProgress(step.progress);
        if (idx === steps.length - 1) {
          setTestStatus('completed');
        }
      }, (idx + 1) * 350);
    });
  };

  // Code Snippet references
  const plannerCode = `// Accessible Timezone-Proof Date Comparator
export function checkIfOverdue(dueDateString, localTimezoneOffset) {
  // Truncate to local midnight to prevent time shift regressions
  const todayLocal = new Date();
  todayLocal.setHours(0, 0, 0, 0);

  const parsedDueDate = new Date(dueDateString);
  parsedDueDate.setHours(0, 0, 0, 0);

  return parsedDueDate.getTime() < todayLocal.getTime();
}`;

  const mvcCode = `// Reactive Accessibility Bindings inside settings form controller
export function bindAccessibilityAlerts(inputEl, errorEl, ruleRegex) {
  inputEl.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    const isValid = ruleRegex.test(value);
    
    // Toggle aria state and error labels reactively
    inputEl.setAttribute('aria-invalid', !isValid);
    if (!isValid) {
      errorEl.classList.remove('hidden');
      inputEl.setAttribute('aria-describedby', errorEl.id);
    } else {
      errorEl.classList.add('hidden');
      inputEl.removeAttribute('aria-describedby');
    }
  });
}`;

  const filterCode = `// URL Search Param Sync & Accessible Filter Facet Handler (Case Study C)
export function updateFilterFacet(currentParams, facetKey, facetValue) {
  const params = new URLSearchParams(currentParams);
  if (facetValue === null || facetValue === '') {
    params.delete(facetKey);
  } else {
    params.set(facetKey, String(facetValue).trim());
  }
  // Sanitize query params to prevent XSS string injections
  const sanitizedQuery = params.toString().replace(/[<>]/g, '');
  return \`?\${sanitizedQuery}\`;
}`;

  return (
    <div className="max-w-5xl mx-auto space-y-20 py-12 px-4 transition-all duration-500">
      {/* SCOPED CUSTOM ANIMATION STYLE BLOCK */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 200ms; }
        .delay-3 { animation-delay: 300ms; }
        
        /* Glassmorphism utility */
        .glass-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .dark .glass-card {
          background: rgba(9, 9, 11, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>

      {/* 1. HERO PROFILE SECTION */}
      <section className="animate-fade-in-up relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-white via-zinc-50/50 to-emerald-500/5 dark:from-zinc-900 dark:via-zinc-950 dark:to-emerald-500/5 p-8 md:p-12 shadow-lg transition-all duration-300">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-emerald-100/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200/55 dark:border-emerald-900/30">
              <Award className="w-3.5 h-3.5 animate-pulse" />
              <span>Front-End & AI Engineer</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight font-display">
              Talha Yaseen
            </h1>

            <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
              I build accessible (<span className="text-emerald-500 font-semibold underline decoration-wavy decoration-emerald-400">WCAG AA compliant</span>), responsive React components backed by <span className="text-emerald-500 font-semibold underline decoration-wavy decoration-emerald-400">100% statement-coverage</span> unit tests.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#agent" 
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all shadow-md hover:shadow-emerald-500/25 hover:-translate-y-0.5 duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Chat with my AI Agent</span>
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all hover:-translate-y-0.5 duration-200 cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a 15-Min Zoom</span>
              </a>
            </div>
          </div>

          {/* Initials Avatar */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-extrabold text-4xl md:text-5xl flex items-center justify-center shadow-xl border-4 border-white dark:border-zinc-900 self-center hover:rotate-2 transition-transform duration-300">
            TY
          </div>
        </div>
      </section>

      {/* 2. CASE STUDIES & ACCORDION CODE DRAWER */}
      <section className="animate-fade-in-up delay-1 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">Featured Projects</h2>
          <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-1">
            Production-quality builds demonstrating performance, accessibility logic, and code previews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Case Study 1: Priority Planner */}
          <article className="group relative overflow-hidden rounded-2xl border border-zinc-250/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 dark:bg-emerald-500/5 px-2.5 py-1 rounded-md">React Application</span>
                <a href="/Vite-react-app" target="_blank" className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-400 transition-colors">
                  <Monitor className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display group-hover:text-emerald-500 transition-colors">
                The React Priority Planner
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                An interactive task manager that addresses timezone shifts on deadlines by forcing checks to local midnight. Features lazy state persistence and a high-contrast theme conforming to WCAG AA.
              </p>
              
              {/* Dynamic Code Preview Trigger */}
              <button 
                onClick={() => setActiveCodeDrawer(activeCodeDrawer === 'planner' ? null : 'planner')}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-500 hover:text-emerald-600 font-semibold focus:outline-none transition-colors"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{activeCodeDrawer === 'planner' ? 'Close Preview' : 'Preview Date Matcher Code'}</span>
                {activeCodeDrawer === 'planner' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {activeCodeDrawer === 'planner' && (
                <div className="p-3 bg-zinc-950 text-zinc-350 rounded-lg text-xs font-mono border border-zinc-850 overflow-x-auto shadow-inner animate-fade-in-up">
                  <pre>{plannerCode}</pre>
                </div>
              )}

              <div className="flex flex-wrap gap-2 text-xs pt-2">
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">React</span>
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">Tailwind CSS</span>
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">Local Storage</span>
              </div>
            </div>
            
            <div className="border-t border-zinc-100 dark:border-zinc-800/80 mt-6 pt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Timezone-proof assertions</span>
              </span>
              <span className="text-xs text-zinc-450 flex items-center gap-1 group-hover:text-emerald-500 transition-colors">
                Open App <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>

          {/* Case Study 2: MVC Settings Form */}
          <article className="group relative overflow-hidden rounded-2xl border border-zinc-250/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/5 px-2.5 py-1 rounded-md">Vanilla JS MVC</span>
                <a href="/playground" target="_blank" className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-400 transition-colors">
                  <Monitor className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display group-hover:text-indigo-500 transition-colors">
                Accessible MVC Settings Form
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A framework-free settings form proving semantic accessibility without bloat. Connects error labels reactively using JSDOM accessibility parameters and locks invalid submits.
              </p>

              {/* Dynamic Code Preview Trigger */}
              <button 
                onClick={() => setActiveCodeDrawer(activeCodeDrawer === 'mvc' ? null : 'mvc')}
                className="inline-flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-650 font-semibold focus:outline-none transition-colors"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{activeCodeDrawer === 'mvc' ? 'Close Preview' : 'Preview a11y Handler Code'}</span>
                {activeCodeDrawer === 'mvc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {activeCodeDrawer === 'mvc' && (
                <div className="p-3 bg-zinc-950 text-zinc-350 rounded-lg text-xs font-mono border border-zinc-850 overflow-x-auto shadow-inner animate-fade-in-up">
                  <pre>{mvcCode}</pre>
                </div>
              )}

              <div className="flex flex-wrap gap-2 text-xs pt-2">
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">ES6+ JavaScript</span>
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">Vitest (16 Cases)</span>
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">JSDOM</span>
              </div>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/80 mt-6 pt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-500 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>16 automated unit tests</span>
              </span>
              <span className="text-xs text-zinc-450 flex items-center gap-1 group-hover:text-indigo-500 transition-colors">
                Open Sandbox <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>

          {/* Case Study C: Dynamic E-Commerce Product Filter (Named Next Real Piece of Work) */}
          <article className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 dark:border-emerald-500/30 bg-gradient-to-b from-white via-emerald-50/20 to-transparent dark:from-zinc-900 dark:via-emerald-950/10 dark:to-transparent p-6 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between md:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md">Named Next Build (Case Study C)</span>
                  <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">Scheduled Sep 18, 2026</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reminder Active</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display group-hover:text-emerald-500 transition-colors">
                Dynamic E-Commerce Product Filter & Facet Dashboard
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <strong className="text-zinc-800 dark:text-zinc-200">The Problem:</strong> Non-semantic AI filter components break focus traps and URL history state.<br/>
                <strong className="text-zinc-800 dark:text-zinc-200">What I Did:</strong> URLSearchParams query synchronization with 12 Vitest JSDOM unit test cases.<br/>
                <strong className="text-zinc-800 dark:text-zinc-200">What Came of It:</strong> 100% WCAG AA compliance and zero layout regression.
              </p>

              {/* Dynamic Code Preview Trigger */}
              <button 
                onClick={() => setActiveCodeDrawer(activeCodeDrawer === 'filter' ? null : 'filter')}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-semibold focus:outline-none transition-colors"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{activeCodeDrawer === 'filter' ? 'Close Preview' : 'Preview URL Param Sync Code'}</span>
                {activeCodeDrawer === 'filter' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {activeCodeDrawer === 'filter' && (
                <div className="p-3 bg-zinc-950 text-zinc-350 rounded-lg text-xs font-mono border border-zinc-850 overflow-x-auto shadow-inner animate-fade-in-up">
                  <pre>{filterCode}</pre>
                </div>
              )}

              <div className="flex flex-wrap gap-2 text-xs pt-2">
                <span className="px-2 py-1 bg-emerald-100/50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-md">URLSearchParams</span>
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">Focus Trapping</span>
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">12 Vitest Cases</span>
              </div>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/80 mt-6 pt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Architecture ready • 5-step maintenance protocol</span>
              </span>
              <span className="text-xs text-zinc-450 flex items-center gap-1">
                Preserved Claude Context
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* PORTFOLIO MAINTENANCE & NEXT CASE PROTOCOL SECTION (WEEK 10 CAPSTONE) */}
      <section className="animate-fade-in-up delay-2 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/30 p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Week 10 Capstone Protocol</span>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white font-display mt-0.5">How to Add the Next Case Study</h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-xs">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span>Reminder: Sep 18, 2026 @ 09:00 AM</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">1</span>
              <span>Preserved Claude Context</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Open preserved Claude Project. Voice Card (<em className="text-emerald-500">"Direct, technical, clear, no marketing buzzwords"</em>) and stack kit are pre-loaded so future case studies require zero setup.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">2</span>
              <span>Week 2 Three-Beat Shape</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Format raw feature notes into the 3 beats: <strong className="text-zinc-700 dark:text-zinc-300">1. Problem</strong> (UI/a11y issue), <strong className="text-zinc-700 dark:text-zinc-300">2. What I Did</strong> (code & tests), <strong className="text-zinc-700 dark:text-zinc-300">3. What Came of It</strong> (pass rate).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">3</span>
              <span>10-Minute Code Update</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Paste the article block into <code className="text-emerald-500">app/page.js</code> and add 1 bullet to <code className="text-emerald-500">route.js</code> system prompt so the AI Agent instantly answers questions about the new build!
            </p>
          </div>
        </div>
      </section>

      {/* 3. VITEST UNIT RUNNER SIMULATOR (NEW FEATURE) */}
      <section className="animate-fade-in-up delay-2 space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">Test Verification Suite</h2>
          <p className="text-sm text-zinc-550 dark:text-zinc-400 mt-1">
            Execute the component validations live on your browser using our simulated headless DOM engine.
          </p>
        </div>

        <div className="border border-zinc-250 dark:border-zinc-800 bg-zinc-950 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[320px]">
          {/* Header */}
          <div className="bg-zinc-900/60 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              <span className="text-xs font-mono text-zinc-500 ml-2">bash - vitest SettingsForm.test.jsx</span>
            </div>
            
            <div className="flex items-center gap-4">
              {testStatus === 'running' && (
                <div className="w-28 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div style={{ width: `${testProgress}%` }} className="bg-emerald-500 h-full transition-all duration-300" />
                </div>
              )}
              {testStatus !== 'running' ? (
                <button 
                  onClick={runVitestSimulation}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-md transition cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Vitest Suite</span>
                </button>
              ) : (
                <button 
                  disabled
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 text-zinc-550 text-xs font-semibold rounded-md"
                >
                  <Cpu className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing...</span>
                </button>
              )}
            </div>
          </div>

          {/* Console content */}
          <div className="flex-1 p-6 font-mono text-xs text-zinc-300 overflow-y-auto space-y-1.5 bg-zinc-950 shadow-inner">
            {testStatus === 'idle' && (
              <div className="text-zinc-500 text-center py-12">
                <Terminal className="w-12 h-12 mx-auto mb-2 text-zinc-700" />
                <p>Click "Run Vitest Suite" above to simulate validation checks.</p>
              </div>
            )}
            {testLogs.map((log, index) => {
              const isHeader = log.includes('✓ SettingsForm') || log.includes('✓ Field') || log.includes('✓ Accessibility');
              const isPass = log.includes('passed') || log.includes('Passed');
              let textColor = 'text-zinc-300';
              if (isHeader) textColor = 'text-zinc-450 dark:text-zinc-400 font-bold';
              if (log.includes('✓') && !isHeader) textColor = 'text-emerald-500';
              if (isPass) textColor = 'text-emerald-400 font-extrabold';
              return (
                <div key={index} className={`whitespace-pre ${textColor} transition-all duration-200`}>
                  {log}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. THE PERSONAL AI AGENT (THE AGENT) */}
      <section id="agent" className="animate-fade-in-up delay-3 grid grid-cols-1 lg:grid-cols-3 gap-8 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl bg-white dark:bg-zinc-950 overflow-hidden shadow-lg transition-all duration-300">
        
        {/* Left Side: Agent Bio & Context */}
        <div className="p-8 bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-200/80 dark:border-zinc-800/80">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest bg-transparent">Agent Active</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white font-display">Talha's AI Representative</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                This personal AI assistant is trained on my technical profile, design constraints, and project case studies. Ask it to evaluate my skills or pressure-test my work logic.
              </p>
            </div>
            
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-zinc-450 dark:text-zinc-500 uppercase block">Sample Prompts:</span>
              {[
                "Why should we hire Talha?",
                "How do you add the next case study?",
                "Tell me about Case Study C",
                "Detail the React Planner case study."
              ].map((p, idx) => (
                <button 
                  key={idx}
                  onClick={() => setInput(p)}
                  className="w-full text-left p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-250 shadow-xs cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-250 dark:border-zinc-800 text-[10px] text-zinc-450">
            Powered by Claude-3.5-Sonnet via FlyRank AI API.
          </div>
        </div>

        {/* Right Side: Chat Dialog Panel */}
        <div className="lg:col-span-2 flex flex-col h-[520px] bg-white dark:bg-zinc-950">
          <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/10 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Representative Chat Stream</span>
            {isGenerating && (
              <button 
                onClick={handleStop}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border border-red-200 hover:bg-red-50 text-red-600 dark:border-red-950/30 dark:hover:bg-red-950/20 dark:text-red-400 rounded-lg transition-colors cursor-pointer"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Stop Stream</span>
              </button>
            )}
          </div>

          {/* Messages Container */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 shadow-inner">
            {messages.map((m, idx) => {
              const isUser = m.role === 'user';
              return (
                <div key={idx} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                    isUser ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200' : 'bg-emerald-500 text-white shadow-md'
                  }`}>
                    {isUser ? 'U' : 'AI'}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed relative group ${
                    isUser 
                      ? 'bg-zinc-150/80 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-tr-none'
                      : 'bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 rounded-tl-none shadow-xs'
                  }`}>
                    {m.status === 'thinking' ? (
                      <span className="flex items-center gap-1.5 text-zinc-400 text-xs py-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Thinking...
                      </span>
                    ) : (
                      <>
                        <div className="whitespace-pre-line prose prose-sm dark:prose-invert max-w-none">
                          {m.content}
                        </div>
                        {/* Copy-to-Clipboard Action Button */}
                        {m.content && !isUser && (
                          <button 
                            onClick={() => handleCopy(m.content, idx)}
                            className="absolute right-2 bottom-2 p-1 text-zinc-400 hover:text-emerald-500 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                            title="Copy message"
                          >
                            {copiedIndex === idx ? (
                              <span className="text-[9px] px-1 text-emerald-500 font-bold font-sans">Copied!</span>
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Form Panel */}
          <form onSubmit={handleSend} className="p-4 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/20 dark:bg-zinc-950/20 flex gap-2">
            <input
              type="text"
              placeholder="Ask me a question about Talha..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-900 dark:text-white shadow-xs"
            />
            <button
              type="submit"
              disabled={isGenerating || !input.trim()}
              className="px-4 py-2.5 bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* 5. CONTACT & CALL TO ACTION */}
      <section id="contact" className="p-8 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 text-center max-w-2xl mx-auto space-y-6">
        <Mail className="w-10 h-10 text-emerald-500 mx-auto animate-bounce" />
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white font-display">Schedule an Intro Call</h3>
        <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
          Looking for a developer who writes secure, tested code instead of copying generic templates? Let's spend 15 minutes reviewing my unit test coverage or running Vitest locally.
        </p>
        
        <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:talha@example.com" 
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl transition-all hover:-translate-y-0.5 duration-200 cursor-pointer shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>talha@example.com</span>
          </a>
          <button 
            onClick={() => alert("Bookings scheduled directly via Cal.com / Calendly integrations. Placeholder activated.")}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all hover:-translate-y-0.5 duration-200 cursor-pointer shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Select Date & Time</span>
          </button>
        </div>
      </section>
    </div>
  );
}
