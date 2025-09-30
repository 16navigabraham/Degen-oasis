import type { Metadata } from 'next';
import './globals.css';
import { WalletProvider } from '@/context/wallet-context';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SoundProvider } from '@/context/sound-context';

export const metadata: Metadata = {
  title: 'Degen Oasis',
  description: 'Daily quotes for the discerning degen.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(
          "font-body antialiased",
          "bg-gradient-to-br from-gray-900 via-purple-900/50 to-blue-900/30",
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SoundProvider>
            <WalletProvider>
              {children}
              <Toaster />
            </WalletProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
