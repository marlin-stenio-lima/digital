import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import FacebookPixel from '@/components/FacebookPixel';
import GoogleAdsTag from '@/components/GoogleAdsTag';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Arsenal do Serralheiro Mestre | 600 Projetos Prontos',
  description:
    'Transforme sua serralheria com 600 projetos prontos de móveis industriais. Plano de corte detalhado, gerador de orçamentos automático e suporte completo. Comece a lucrar hoje mesmo por apenas R$ 13,90.',
  keywords: [
    'serralheiro',
    'projetos de móveis industriais',
    'móveis industriais',
    'serralheria',
    'plano de corte',
    'orçamento serralheria',
  ],
  openGraph: {
    title: 'Arsenal do Serralheiro Mestre | 600 Projetos Prontos',
    description:
      'Transforme sua serralheria com 600 projetos prontos de móveis industriais com plano de corte e gerador de orçamentos.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <FacebookPixel />
        <GoogleAdsTag />
        {children}
      </body>
    </html>
  );
}
