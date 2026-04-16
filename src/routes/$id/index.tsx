import { createFileRoute } from '@tanstack/react-router';
import events from '@/data/events.json';
import slides from '@/data/slides.json';
import Gallery from '@/components/Gallery';

export const Route = createFileRoute('/$id/')({
  component: EventPage,
});

function EventPage() {
  const { id } = Route.useParams();
  const event = events.find((e) => e.id === id) || events[0];
  const allSlides = Object.values(slides).flat();
  const eventSlides =
    id === 'all' ? allSlides : slides[id as keyof typeof slides] || [];

  return (
    <div className="px-3 sm:px-6 pb-6 pt-3">
      <h1 className="text-2xl font-bold mb-4 text-white">{event.name}</h1>
      <Gallery slides={eventSlides} />
    </div>
  );
}
