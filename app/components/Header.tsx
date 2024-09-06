'use client';
import React from 'react';
import Image from 'next/image';
import useSidebarStore from '@/utils/open-sidebar';

export default function Header() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <header className="lg:hidden fixed top-0 w-full bg-neutral-900 z-50 flex items-center justify-between px-4 py-4">
      <Image src="/logo.svg" alt="Logo" width={32} height={32} className="h-8 w-8" />
      <h1 className="font-semibold text-lg text-white">Apple Slides</h1>
      <button className="text-white" onClick={toggleSidebar}>
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
}
