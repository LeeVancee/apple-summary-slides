'use client';
import React from 'react';
import { useParams, useRouter } from '@tanstack/react-router';
import events from '@/data/events.json';
import categories from '@/data/categories.json';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const params = useParams({ strict: false });
  const router = useRouter();
  const currentEventId = (params.id as string) || 'all';
  const currentCategoryId = (params.categoryId as string) || 'all';

  const currentEvent =
    events.find((event) => event.id === currentEventId) || events[0];
  const currentCategories = currentEvent.categories;

  const matchedCategories = categories.filter((category) =>
    currentCategories.includes(category.id),
  );

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'all') {
      router.navigate({ to: '/$id', params: { id: currentEventId } });
    } else {
      router.navigate({
        to: '/$id/$categoryId',
        params: { id: currentEventId, categoryId },
      });
    }
  };

  const renderCategoryButton = (category: (typeof categories)[0]) => {
    const isActive = category.id === currentCategoryId;
    return (
      <button
        key={category.id}
        onClick={() => handleCategoryClick(category.id)}
        className={cn(
          'flex flex-col items-center justify-center py-2 px-4 rounded-2xl whitespace-nowrap min-w-[90px] text-white transition-colors duration-300',
          isActive ? 'bg-neutral-700' : 'bg-neutral-900 hover:bg-neutral-700',
        )}
      >
        <img src={category.icon} alt={category.name} width={48} height={48} className="w-12 h-12 inline" />
        <span className="text-sm text-white mt-2">{category.name}</span>
      </button>
    );
  };

  return (
    <nav className="sticky top-16 sm:top-0 w-full px-3 sm:px-6 pt-3 sm:pt-6 pb-2 sm:pb-4 z-10 before:content before:absolute before:inset-0 before:bg-black before:bg-opacity-60 before:blur-sm before:-z-10 bg-linear-to-b from-neutral-950 to-neutral-950/0">
      <div className="flex flex-wrap gap-2">
        <div className="relative w-full rounded-2xl min-h-[100px] overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-neutral-950 to-neutral-950/0"></div>
          <div className="absolute inset-0 bg-black bg-opacity-60 blur-sm"></div>
          <div className="relative w-full h-full rounded-2xl flex items-center ring-1 ring-white/15 p-2 sm:p-4 shadow-xs bg-neutral-900">
            <div className="w-full flex gap-3 overflow-x-auto hide-scrollbar">
              {matchedCategories.map(renderCategoryButton)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
