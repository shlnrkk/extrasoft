import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'EXTRASOFT — Make type move', description: 'An interactive playground for expressive typography.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
