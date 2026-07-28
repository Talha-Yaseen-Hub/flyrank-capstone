// @ts-nocheck
import React, { useState } from 'react';

export interface DisclosureProps {
  label: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Disclosure({ label, children, defaultOpen = false }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = React.useId();

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-zinc-950 dark:text-zinc-50 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
      >
        <span>{label}</span>
        <svg
          className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        id={panelId}
        hidden={!isOpen}
        className={`px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-650 dark:text-zinc-400 bg-white dark:bg-zinc-900 transition-all ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Disclosure;
