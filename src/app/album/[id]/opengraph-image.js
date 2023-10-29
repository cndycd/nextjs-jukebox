import { ImageResponse } from 'next/og';

import { albums } from '~/data';

export default async function OpenGraphImage({ params }) {
  const slug = params.id;
  const { title, artist, color } = albums[slug];
  const albumCoverSrc = `https://jukebox.candycode.com/covers/${slug}.jpg`;

  const robotoBold = fetch(new URL('../../../fonts/Roboto-Bold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: color,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '50%',
            height: '100%',
            padding: '64px',
          }}
        >
          <img
            src={albumCoverSrc}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt=""
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            paddingRight: '64px',
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: 32,
            color: 'white',
          }}
        >
          <div>{`${title}`}</div>
          <div style={{ opacity: 0.6 }}>{`by ${artist}`}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Roboto',
          data: await robotoBold,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );
}

export const contentType = 'image/jpg';

export const size = {
  width: 1200,
  height: 630,
};

export const runtime = 'edge';
