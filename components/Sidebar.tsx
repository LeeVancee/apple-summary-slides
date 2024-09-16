'use client';
import React from 'react';
import Image from 'next/image';
import events from '@/data/events.json';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useSidebarStore from '@/utils/open-sidebar';

const Sidebar: React.FC = () => {
  const { isOpen } = useSidebarStore();
  const params = useParams();
  const id = (params.id as string) || 'all';

  return (
    <>
      {/* Mobile sidebar */}
      <aside
        className={`sm:m-6 lg:hidden fixed top-16 bottom-0 z-40 overflow-y-auto transition-transform duration-500 hide-scrollbar ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="py-3 flex flex-1 flex-col gap-y-7 px-4 pb-4 bg-neutral-900 hide-scrollbar">
          {events.map((event) => {
            const isActive = id === event.id;
            return (
              <Link href={`/${event.id}`} key={event.id} className="block">
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl text-white transition-colors duration-300 ${
                    isActive ? 'bg-neutral-700' : 'bg-neutral-800 hover:bg-neutral-700'
                  }`}
                >
                  <Image
                    src={event.image}
                    alt={`Thumbnail for ${event.name}`}
                    width={224}
                    height={114}
                    className="w-[224px] h-[114px] object-cover mb-4 rounded-xl"
                  />
                  <span className="text-center text-sm">{event.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block rounded-2xl m-3 sm:m-6 fixed top-0 bottom-0 left-0 w-64 z-40 overflow-y-auto bg-neutral-900 hide-scrollbar">
        <div className="flex top-0 sticky shrink-0 items-center shadow-sm p-4 justify-center bg-neutral-900 gap-x-4">
          <Image src="/logo.svg" alt="Apple Summary Slides logo" width={32} height={32} />
          <h1 className="font-semibold  text-white">Apple Summary Slides</h1>
        </div>
        <nav className="mt-4 space-y-4 px-4">
          {events.map((event) => {
            const isActive = id === event.id;
            return (
              <Link href={`/${event.id}`} key={event.id} className="block">
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl text-white transition-colors duration-300 ${
                    isActive ? 'bg-neutral-700' : 'bg-neutral-800 hover:bg-neutral-700'
                  }`}
                >
                  <Image
                    src={event.image}
                    alt={`Thumbnail for ${event.name}`}
                    width={224}
                    height={114}
                    className="w-[180px] h-[114px] object-cover mb-4 rounded-xl"
                    priority
                  />
                  <span className="text-center text-sm">{event.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
