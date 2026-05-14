import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aimen · 爱门',
  description: 'Narrative engine fused with video, and a video data hub for vision and robotics.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
