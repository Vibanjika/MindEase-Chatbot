import type { Metadata } from 'next';
import './styles.css';
export const metadata: Metadata = { title: 'MindEase — A space to feel heard', description: 'A gentle space to pause, reflect, and talk things through.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
