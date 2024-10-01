import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Navigation from '@/components/Navigation';
import { Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'Split',
  description: 'Split your expenses with your friends',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <Navigation />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
