// @ts-nocheck
import React, { useState, useRef } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  label?: string;
}

export function Tabs({ items, defaultValue, label }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultValue || items[0]?.id);
  const tablistRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(tablistRef.current?.querySelectorAll('[role="tab"]') || []) as HTMLElement[];
    if (tabs.length === 0) return;

    const currentIndex = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    const nextTab = tabs[nextIndex];
    const nextId = nextTab.getAttribute('data-tab-id');
    if (nextId) {
      setActiveId(nextId);
      nextTab.focus();
    }
  };

  return (
    <div className="w-full">
      <div
        ref={tablistRef}
        role="tablist"
        aria-label={label}
        onKeyDown={handleKeyDown}
        className="flex space-x-1 border-b border-zinc-200 dark:border-zinc-800"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              role="tab"
              id={`tab-trigger-${item.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              data-tab-id={item.id}
              onClick={() => setActiveId(item.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-t-md ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-300'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div
              key={item.id}
              role="tabpanel"
              id={`tabpanel-${item.id}`}
              aria-labelledby={`tab-trigger-${item.id}`}
              tabIndex={0}
              hidden={!isActive}
              className={`p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-md border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary ${
                isActive ? 'block' : 'hidden'
              }`}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
