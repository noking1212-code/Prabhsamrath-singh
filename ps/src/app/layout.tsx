import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/providers/theme-provider';
import { LenisProvider } from '@/providers/lenis-provider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'Prabhsamrath Singh | Software Engineer & Architect',
    template: '%s | Prabhsamrath Singh',
  },
  description: 'Digital experience and personal brand platform curated by Prabhsamrath Singh.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Prabhsamrath Singh',
    description: 'Digital experience and personal brand platform curated by Prabhsamrath Singh.',
    siteName: 'Prabhsamrath Singh',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prabhsamrath Singh',
    description: 'Digital experience and personal brand platform curated by Prabhsamrath Singh.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LenisProvider>
              {children}
            </LenisProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}