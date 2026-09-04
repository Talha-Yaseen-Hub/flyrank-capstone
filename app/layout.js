import React from 'react';
import Navigation from '@/components/Navigation';
import '@/app/globals.css';

export const metadata = {
  metadataBase: new URL('https://flyrank-capstone-git-feat-settings-v2-yaseen-raza-dev.vercel.app'),
  title: {
    default: 'Talha Yaseen — Front-End & AI Engineer | FlyRank Capstone',
    template: '%s | Talha Yaseen Portfolio'
  },
  description: 'Portfolio of Talha Yaseen: WCAG AA compliant, responsive React application backed by 100% statement-coverage Vitest suites and serverless AI integrations.',
  keywords: ['Front-End Engineer', 'React Developer', 'AI Engineering', 'Vitest', 'Next.js', 'Accessibility', 'WCAG AA', 'TypeScript'],
  authors: [{ name: 'Talha Yaseen' }],
  creator: 'Talha Yaseen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flyrank-capstone-git-feat-settings-v2-yaseen-raza-dev.vercel.app',
    title: 'Talha Yaseen — Front-End & AI Engineer',
    description: 'Accessible, responsive React applications with 100% test coverage and AI agent integrations.',
    siteName: 'Talha Yaseen Portfolio & FlyRank AI Capstone',
    images: [
      {
        url: '/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Talha Yaseen — Front-End & AI Engineer Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talha Yaseen — Front-End & AI Engineer',
    description: 'Accessible React components backed by 100% test coverage and AI agent integrations.',
    creator: '@talhayaseen',
    images: ['/og-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
