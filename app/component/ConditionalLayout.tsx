'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Particles from './Particles';
import AOSInit from './AOS';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isGamesRoute = pathname?.startsWith('/games');

  return (
    <>
      <Particles />
      <AOSInit />
      {!isGamesRoute && <Header />}
      {children}
      {!isGamesRoute && <Footer />}
    </>
  );
}
