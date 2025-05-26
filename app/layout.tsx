import Provider from '@/providers/provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'multi-vendor',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <body className={`${geistSans.variable} scrollbar-custom min-h-screen max-h-screen overflow-hidden  ${geistMono.variable} antialiased`}>
        <Provider>
          <main className="text-sm">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
