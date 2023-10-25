import { Component } from './component';

import { albums } from '~/data';

export default function AlbumPage({ params }) {
  return <Component params={params} />;
}

/** @type {import("next").generateMetadata} */
export const generateMetadata = async ({ params }) => {
  const slug = params.id;
  const { title, artist, color } = albums[slug];

  return {
    title: `${title} by ${artist}`,
  };
};
