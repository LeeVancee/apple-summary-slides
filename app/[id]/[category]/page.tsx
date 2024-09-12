import events from '@/data/events.json';
import categories from '@/data/categories.json';
import slides from '@/data/slides.json';
import Gallery from '@/components/Gallery';

export default function EventCategoryPage({ params }: { params: { id: string; category: string } }) {
  const event = events.find((e) => e.id === params.id) || events[0];
  const category = categories.find((c) => c.id === params.category);

  const allSlides = Object.values(slides).flat();
  const eventSlides = params.id === 'all' ? allSlides : slides[params.id as keyof typeof slides] || [];

  const filteredSlides =
    params.category === 'all'
      ? eventSlides
      : (params.id === 'all' ? allSlides : eventSlides).filter((slide) => slide.category === params.category);

  return (
    <div className="px-3 sm:px-6 pb-6 pt-3">
      <h1 className="text-2xl font-bold mb-4 text-white">
        {event.name} - {category?.name || 'All'}
      </h1>
      <Gallery slides={filteredSlides} />
    </div>
  );
}
