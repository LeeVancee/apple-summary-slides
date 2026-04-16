import { createFileRoute } from '@tanstack/react-router';
import events from '@/data/events.json';
import categories from '@/data/categories.json';
import slides from '@/data/slides.json';
import Gallery from '@/components/Gallery';

export const Route = createFileRoute('/$id/$categoryId')({
  component: EventCategoryPage,
});

function EventCategoryPage() {
  const { id, categoryId } = Route.useParams();
  const event = events.find((e) => e.id === id) || events[0];
  const decodedCategory = decodeURIComponent(categoryId);
  const category = categories.find((c) => c.id === decodedCategory);

  const allSlides = Object.values(slides).flat();
  const eventSlides =
    id === 'all' ? allSlides : slides[id as keyof typeof slides] || [];

  const filteredSlides =
    decodedCategory === 'all'
      ? eventSlides
      : (id === 'all' ? allSlides : eventSlides).filter(
          (slide) => slide.category === decodedCategory,
        );

  return (
    <div className="px-3 sm:px-6 pb-6 pt-3">
      <h1 className="text-2xl font-bold mb-4 text-white">
        {event.name} - {category?.name || 'All'}
      </h1>
      <Gallery slides={filteredSlides} />
    </div>
  );
}
