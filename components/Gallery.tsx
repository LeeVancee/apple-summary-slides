'use client';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { cn } from '@/lib/utils';

interface GalleryProps {
  slides: { id: string; image: string; title: string }[];
}

export default function Gallery({ slides }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const lightboxSlides = slides.map((slide) => ({
    src: slide.image,
    alt: `Full size image: ${slide.title}`,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {slides.map((slide, index) => (
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
          <div className="relative w-full pb-[56.25%]">
            <Image
              src={slide.image}
              alt={`Thumbnail: ${slide.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      ))}
      <Lightbox open={isOpen} close={() => setIsOpen(false)} slides={lightboxSlides} index={currentImageIndex} />
    </div>
  );
}
