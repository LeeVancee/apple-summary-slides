'use client';
import Image from 'next/image';
import events from '../data/event.json';
import slides from '../data/slides.json';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { cn } from '@/lib/utils';

export default function EventPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id) || events[0];
  const allSlides = Object.values(slides).flat();
  const eventSlides = params.id === 'all' ? allSlides : slides[params.id as keyof typeof slides] || [];

  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const lightboxSlides = eventSlides.map((slide) => ({
    src: slide.image,
    alt: slide.title,
  }));

  return (
    <div className="px-3 sm:px-6 pb-6 pt-3">
      <h1 className="text-2xl font-bold mb-4 text-white">{event.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'bg-neutral-800 rounded-lg overflow-hidden shadow-lg',
              'transition-transform duration-300 hover:scale-105 cursor-pointer'
            )}
            onClick={() => {
              setCurrentImageIndex(index);
              setIsOpen(true);
            }}
          >
            <Image src={slide.image} alt={slide.title} width={530} height={300} className="w-full h-auto rounded-lg" />
          </div>
        ))}
      </div>
      <Lightbox open={isOpen} close={() => setIsOpen(false)} slides={lightboxSlides} index={currentImageIndex} />
    </div>
  );
}
