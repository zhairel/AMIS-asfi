import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://asfi.amis.ph'),
  title: 'Membership Registration | AMIS Sadaqah Family Incorporated (ASFI)',
  description: 'Official Online Membership Application for AMIS Sadaqah Family Incorporated (ASFI). SEC Reg. No. 2026070258874-03. Davao City, Philippines.',
  keywords: ['ASFI', 'AMIS Sadaqah Family', 'Membership Application', 'Sadaqah Mutual Assistance', 'Davao City', 'Takaful'],
  openGraph: {
    title: 'ASFI Official Membership Registration',
    description: 'Apply for membership in AMIS Sadaqah Family Incorporated. Halal mutual assistance through voluntary monthly Sadaqah.',
    images: ['/asfi-logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/asfi-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
