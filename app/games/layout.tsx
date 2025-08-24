import React from 'react';

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className='h-svh w-full bg-black'>{children}</main>;
}
