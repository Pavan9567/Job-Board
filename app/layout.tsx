import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Mini Job Board',
  description: 'A simple job board application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
