// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Modal } from './components/Modal'
import { Tabs } from './components/Tabs'
import { Disclosure } from './components/Disclosure'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import {
  Tabs as ShadcnTabs,
  TabsContent as ShadcnTabsContent,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
} from './components/ui/tabs'
import { Sun, Moon, Sparkles, Terminal, Keyboard, ShieldAlert } from 'lucide-react'

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false)

  // Sync dark class on html tag
  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const tabItems = [
    {
      id: 'tab1',
      label: 'AI SEO Insights',
      content: (
        <div className="space-y-2">
          <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Search Engine Visibility</h4>
          <p className="text-sm text-zinc-650 dark:text-zinc-400">
            Automate structured data injections and content alignment for search surfaces like ChatGPT and Perplexity.
          </p>
          <div className="pt-2">
            <button className="px-3 py-1.5 text-xs font-medium text-white bg-primary rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Run Audit Now
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'tab2',
      label: 'Rank Tracker',
      content: (
        <div className="space-y-2">
          <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Keyword Performance</h4>
          <p className="text-sm text-zinc-650 dark:text-zinc-400">
            Monitor real-time SERP rankings. Detect keyword cannibalization and find low-hanging optimization opportunities.
          </p>
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add keyword..."
              aria-label="Keyword input"
              className="px-2 py-1 text-xs border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-3 py-1 text-xs font-medium border border-zinc-300 dark:border-zinc-700 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary">
              Track
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'tab3',
      label: 'System Status',
      content: (
        <div className="space-y-2">
          <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Audit Engine Health</h4>
          <p className="text-sm text-zinc-650 dark:text-zinc-400">
            Verification status: <span className="text-emerald-500 font-semibold">Active</span>. Dynamic content analyzer operational.
          </p>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded text-xs">
            Health Check Success (200 OK) — DB Connected.
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
              FlyRank A11y Playground
            </h1>
          </div>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Toggle to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Modal Dialogs */}
          <section className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-6">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">1. Modal Dialog (Focus Trap & Escape)</h2>
            </div>
            <p className="text-sm text-zinc-550 dark:text-zinc-400">
              ARIA APG requirements: trapping focus within active modal, locking body scrolling, ESC to close, and restoring focus to trigger upon closure.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {/* Trigger Custom Modal */}
              <button
                onClick={() => setIsCustomModalOpen(true)}
                className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Open Custom Modal
              </button>

              {/* Trigger Shadcn Dialog */}
              <Dialog>
                <DialogTrigger className="px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Open Shadcn Dialog
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Shadcn Dialog Modal</DialogTitle>
                    <DialogDescription className="pt-2">
                      This modal dialog is powered by Radix UI. It handles focus trapping, scroll locking, background overlay click dismiss, and returns focus.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <input
                      type="text"
                      placeholder="Input field inside shadcn..."
                      aria-label="First input"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                      Submit inside Radix
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Custom Modal Rendering */}
            <Modal
              isOpen={isCustomModalOpen}
              onClose={() => setIsCustomModalOpen(false)}
              title="Custom Scratch Modal"
            >
              <div className="space-y-4">
                <p>
                  This modal is built completely from scratch without external libraries. Keyboard navigation is locked inside!
                </p>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="modal-name" className="block text-xs font-semibold text-zinc-550 dark:text-zinc-400 mb-1">
                      Full Name
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-role" className="block text-xs font-semibold text-zinc-550 dark:text-zinc-400 mb-1">
                      Account Role
                    </label>
                    <select
                      id="modal-role"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>SEO Specialist</option>
                      <option>Admin Manager</option>
                      <option>Marketing Analyst</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsCustomModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsCustomModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </Modal>
          </section>

          {/* Card 2: Disclosure / Accordions */}
          <section className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-6">
            <div className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">2. Disclosure (Keyboard Trigger)</h2>
            </div>
            <p className="text-sm text-zinc-550 dark:text-zinc-400">
              ARIA APG requirements: button trigger with dynamic `aria-expanded` and `aria-controls` linked to the panel ID, operated with Space or Enter keys.
            </p>

            <div className="space-y-4">
              <Disclosure label="FAQ: What is a focus trap?">
                A focus trap intercepts the tab key press at the boundaries of an open dialog. Tabbing forward past the last focusable element wraps back to the first, and tabbing backward past the first element wraps to the last. This prevents keyboard-only users from tab-navigating elements in the background document while a modal is active.
              </Disclosure>

              <Disclosure label="FAQ: How is disclosure state communicated?">
                The disclosure uses the `aria-expanded` state on the button itself. Screen readers immediately announce if the section is expanded or collapsed when the user tabs onto the button header, making the relationship clear.
              </Disclosure>
            </div>
          </section>
        </div>

        {/* Section: Custom Tabs vs Shadcn Tabs */}
        <section className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">3. Tabs (Arrow Navigation & Focus Control)</h2>
          </div>
          <p className="text-sm text-zinc-550 dark:text-zinc-400">
            ARIA APG requirements: container `role="tablist"`, active tab has `tabIndex={0}`, inactive tabs have `tabIndex={-1}`. Left/Right Arrow keys navigate and activate tabs automatically; Home/End jump to boundaries.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
            {/* Custom Tabs */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                Custom Scratch Tabs (Auto-Activation)
              </h3>
              <Tabs items={tabItems} label="SEO Analytics Tools" />
            </div>

            {/* Shadcn Tabs */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                Shadcn/Radix Tabs (Auto-Activation)
              </h3>
              <ShadcnTabs defaultValue="tab1" className="w-full">
                <ShadcnTabsList className="w-full justify-start">
                  <ShadcnTabsTrigger value="tab1" className="flex-1 lg:flex-initial">AI SEO Insights</ShadcnTabsTrigger>
                  <ShadcnTabsTrigger value="tab2" className="flex-1 lg:flex-initial">Rank Tracker</ShadcnTabsTrigger>
                  <ShadcnTabsTrigger value="tab3" className="flex-1 lg:flex-initial">System Status</ShadcnTabsTrigger>
                </ShadcnTabsList>
                <ShadcnTabsContent value="tab1" className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-md border border-zinc-200 dark:border-zinc-850">
                  {tabItems[0].content}
                </ShadcnTabsContent>
                <ShadcnTabsContent value="tab2" className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-md border border-zinc-200 dark:border-zinc-850">
                  {tabItems[1].content}
                </ShadcnTabsContent>
                <ShadcnTabsContent value="tab3" className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-md border border-zinc-200 dark:border-zinc-850">
                  {tabItems[2].content}
                </ShadcnTabsContent>
              </ShadcnTabs>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
