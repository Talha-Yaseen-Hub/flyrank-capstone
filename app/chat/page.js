'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Square, 
  Bot, 
  User, 
  ArrowDown, 
  Sparkles, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I am FlyRank AI, your search visibility and audit assistant. Ask me to draft an SEO strategy, check your schema structured data formats, or analyze crawler configurations!',
      status: 'done' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const abortControllerRef = useRef(null);
  const chatEndRef = useRef(null);
  const containerRef = useRef(null);
  
  const [showJumpButton, setShowJumpButton] = useState(false);

  // Monitor scrolling to lock or unlock the auto-scroll focus pin
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    // Check distance from bottom of scrollable area
    const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (distanceToBottom > 150) {
      setShowJumpButton(true);
    } else {
      setShowJumpButton(false);
    }
  };

  const scrollToBottom = (behavior = 'smooth') => {
    chatEndRef.current?.scrollIntoView({ behavior });
    setShowJumpButton(false);
  };

  // Scroll to bottom dynamically during streaming if locked
  useEffect(() => {
    if (isGenerating && !showJumpButton) {
      scrollToBottom('auto');
    }
  }, [messages, isGenerating, showJumpButton]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage = { role: 'user', content: input.trim(), status: 'done' };
    setInput('');
    setIsGenerating(true);

    // Append user message and insert placeholder thinking state for assistant
    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: 'assistant', content: '', status: 'thinking' }
    ]);

    // Create AbortController to support Stop action
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const token = decoder.decode(value);
        accumulatedText += token;

        // Transition from 'thinking' status to 'streaming' and update content
        setMessages((prev) => {
          const list = [...prev];
          const last = list[list.length - 1];
          if (last && last.role === 'assistant') {
            last.status = 'streaming';
            last.content = accumulatedText;
          }
          return list;
        });
      }

      // Mark streaming completion
      setMessages((prev) => {
        const list = [...prev];
        const last = list[list.length - 1];
        if (last && last.role === 'assistant') {
          last.status = 'done';
        }
        return list;
      });

    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Streaming halted by client.');
        setMessages((prev) => {
          const list = [...prev];
          const last = list[list.length - 1];
          if (last && last.role === 'assistant') {
            last.status = 'stopped';
          }
          return list;
        });
      } else {
        console.error('Fetch error:', err);
        setMessages((prev) => {
          const list = [...prev];
          const last = list[list.length - 1];
          if (last && last.role === 'assistant') {
            last.status = 'error';
            last.content = 'Sorry, I encountered an issue processing your request. Please try again.';
          }
          return list;
        });
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // Safe incremental Markdown renderer mapping text elements into React elements
  const renderResponseContent = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements = [];
    let inTable = false;
    let tableRows = [];
    let inList = false;
    let listItems = [];

    const flushTable = (key) => {
      if (tableRows.length === 0) return null;
      const hasHeader = tableRows.length > 1 && lines[lines.indexOf(tableRows[0].raw) + 1]?.includes('---');
      
      const rendered = (
        <div key={`table-${key}`} className="my-4 overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              {hasHeader ? (
                <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-850 font-semibold text-zinc-650 dark:text-zinc-300">
                  {tableRows[0].cells.map((cell, cIdx) => (
                    <th key={cIdx} className="px-4 py-2">{cell}</th>
                  ))}
                </tr>
              ) : null}
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {tableRows.slice(hasHeader ? 2 : 0).map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
                  {row.cells.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
      return rendered;
    };

    const flushList = (key) => {
      if (listItems.length === 0) return null;
      const rendered = (
        <ul key={`list-${key}`} className="my-2 space-y-1 pl-5 list-disc text-xs text-zinc-700 dark:text-zinc-300">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
      return rendered;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Table row parser
      if (line.startsWith('|') && line.endsWith('|')) {
        if (inList) elements.push(flushList(i));
        inTable = true;
        const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        tableRows.push({ raw: lines[i], cells });
        continue;
      } else if (inTable) {
        elements.push(flushTable(i));
      }

      // List parsing
      if (line.startsWith('- ') || line.startsWith('* ') || /^\d+\.\s/.test(line)) {
        if (inTable) elements.push(flushTable(i));
        inList = true;
        const content = line.replace(/^(?:-\s|\*\s|\d+\.\s)/, '');
        listItems.push(parseInlineFormatting(content));
        continue;
      } else if (inList) {
        elements.push(flushList(i));
      }

      // Header parsing
      if (line.startsWith('#')) {
        const depth = (line.match(/^#+/) || [''])[0].length;
        const content = line.replace(/^#+\s*/, '');
        const Comp = depth === 1 ? 'h1' : depth === 2 ? 'h2' : 'h3';
        const classes = depth === 1 ? 'text-lg font-bold font-display my-3 mt-4 text-zinc-900 dark:text-white' : depth === 2 ? 'text-md font-bold font-display my-2.5 mt-3 text-zinc-900 dark:text-white' : 'text-xs font-bold my-2 text-zinc-900 dark:text-white';
        elements.push(
          <Comp key={i} className={classes}>
            {parseInlineFormatting(content)}
          </Comp>
        );
        continue;
      }

      // Paragraph formatting
      if (line !== '') {
        if (line.includes('---') && !line.includes('|')) continue; // skip horizontal markers
        elements.push(
          <p key={i} className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed my-1.5">
            {parseInlineFormatting(line)}
          </p>
        );
      }
    }

    if (inTable) elements.push(flushTable(lines.length));
    if (inList) elements.push(flushList(lines.length));

    return <div className="space-y-0.5">{elements}</div>;
  };

  const parseInlineFormatting = (text) => {
    const parts = [];
    let remaining = text;
    let keyIdx = 0;

    while (remaining) {
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
      const codeMatch = remaining.match(/`(.*?)`/);

      const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : -1;
      const codeIdx = codeMatch ? remaining.indexOf(codeMatch[0]) : -1;

      if (boldIdx !== -1 && (codeIdx === -1 || boldIdx < codeIdx)) {
        if (boldIdx > 0) parts.push(remaining.substring(0, boldIdx));
        parts.push(
          <strong key={`b-${keyIdx++}`} className="font-bold text-zinc-950 dark:text-white">
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.substring(boldIdx + boldMatch[0].length);
      } else if (codeIdx !== -1) {
        if (codeIdx > 0) parts.push(remaining.substring(0, codeIdx));
        parts.push(
          <code key={`c-${keyIdx++}`} className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-450 font-mono text-[10px] rounded">
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.substring(codeIdx + codeMatch[0].length);
      } else {
        parts.push(remaining);
        break;
      }
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] lg:h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white font-display">AI Audit Assistant</h1>
          <p className="text-[10px] text-zinc-450 dark:text-zinc-500 font-semibold tracking-wider uppercase">Streaming SEO Consultant</p>
        </div>
      </div>

      {/* Message List area */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto py-6 space-y-6 scroll-smooth pr-1"
      >
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';
          
          return (
            <div 
              key={idx} 
              className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Bot Icon */}
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              {/* Bubble message */}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-xs border ${
                isUser 
                  ? 'bg-emerald-500 border-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 rounded-tl-none text-zinc-850 dark:text-zinc-250'
              }`}>
                {isUser ? (
                  <p className="text-xs leading-relaxed whitespace-pre-wrap">{m.content}</p>
                ) : m.status === 'thinking' ? (
                  /* Animated Thinking Indicator */
                  <div className="flex items-center gap-1.5 py-1.5 px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-450 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-450 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-450 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider ml-1.5 animate-pulse-light">AI is thinking</span>
                  </div>
                ) : (
                  /* Formatted content response */
                  <div className="prose dark:prose-invert max-w-none">
                    {renderResponseContent(m.content)}
                    {/* Inline state icons */}
                    {m.status === 'streaming' && (
                      <span className="inline-block w-1.5 h-3.5 ml-1 bg-emerald-500 animate-pulse" />
                    )}
                    {m.status === 'stopped' && (
                      <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Generation stopped by user</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Icon */}
              {isUser && (
                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-300 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Floating Jump button */}
      {showJumpButton && (
        <div className="flex justify-center -mt-8 mb-4 relative z-10">
          <button
            onClick={() => scrollToBottom()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-md rounded-full transition-all"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            <span>Jump to Latest</span>
          </button>
        </div>
      )}

      {/* Input panel area */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 pb-4">
        <form onSubmit={handleSend} className="relative flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
            placeholder={isGenerating ? "AI is generating recommendations..." : "Ask the Audit Engine (e.g. suggestions for blog layout)..."}
            className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 pr-12 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-900 dark:text-white disabled:opacity-50 transition-all shadow-xs"
          />

          {isGenerating ? (
            /* Stop Generator Button */
            <button
              type="button"
              onClick={handleStop}
              className="absolute right-3 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors focus:outline-none"
              aria-label="Stop generation"
            >
              <Square className="w-4 h-4 fill-red-500" />
            </button>
          ) : (
            /* Send Button */
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-3 p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-30 disabled:hover:bg-emerald-500 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>

    </div>
  );
}
