import React from 'react';
import Navigation from '@/components/Navigation';
import '@/app/globals.css';

export const metadata = {
  title: 'FlyRank AI — SEO & Search Visibility Dashboard',
  description: 'AI-driven content optimization, search analytics, and citation monitoring.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Inline script to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-150 transition-colors duration-150">
        <div className="min-h-screen flex flex-col lg:flex-row">
          <Navigation />
          
          {/* Main workspace container */}
          <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
            <div className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
