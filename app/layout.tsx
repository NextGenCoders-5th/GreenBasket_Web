import ReduxProvider from '@/providers/redux.provider';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Footer from './_components/Footer';
import { Header } from './_components/Header';
import './globals.css';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} scrollbar-custom min-h-screen max-h-screen overflow-y-scroll  ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ReduxProvider>
            <Header />
            <main className="p-4">{children}</main>
            <Footer />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
