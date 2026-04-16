import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/animations.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { ModalsProvider } from '@/contexts/modals/ModalsProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Medeiros & Santiago',
    template: '%s | Medeiros & Santiago',
  },
  description: 'Adv. Especialistas em - em direito trabalhista, família cívil e previdenciário.',
  keywords: [
    'Advogados',
    'Direito trabalhista',
    'Direito Civil',
    'Vara de família',
    'Custódia',
    'Previdência',
  ],
  icons: { icon: 'https://corporate-lawyer-website.onrender.com/website-logo-with-circle.svg' },
  openGraph: {
    title: 'Medeiros & Santiago Advogados',
    description: 'Adv. Especialistas em - em direito trabalhista, família cívil e previdenciário.',
    siteName: 'Morelo & Santiago',
    images: [
      {
        url: 'https://corporate-lawyer-website.onrender.com/website-preview.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-color-black relative text-2xl`}
      >
        <ModalsProvider>
          <header>
            <Navbar />
          </header>
          <main className="flex-1">{children}</main>
          <WhatsAppButton whatsAppNumber="#" />
          <Footer />
        </ModalsProvider>
      </body>
    </html>
  );
}
