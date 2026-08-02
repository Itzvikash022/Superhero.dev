import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import App from '../App';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Marvel Characters — Spider-Man, Captain America & Black Panther' },
      { name: 'description', content: 'Explore Marvel heroes Spider-Man, Captain America, and Black Panther with an interactive 3D parallax character showcase.' },
      { property: 'og:title', content: 'Marvel Characters — Spider-Man, Captain America & Black Panther' },
      { property: 'og:description', content: 'Explore Marvel heroes Spider-Man, Captain America, and Black Panther with an interactive 3D parallax character showcase.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  return <App />;
}
