import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import appCss from '../styles/globals.css?url';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Apple Summary Slides' },
      { name: 'description', content: 'Apple Summary Slides' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/logo.svg' },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased min-h-screen bg-neutral-950">
        <Header />
        <Sidebar />
        <main className="flex-1 lg:pl-72 w-full pt-16 lg:pt-0 px-0">
          <Navbar />
          <Outlet />
        </main>
        <Scripts />
      </body>
    </html>
  );
}
