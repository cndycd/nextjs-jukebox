import { ImageResponse } from 'next/server';

export default async function OpenGraphImage() {
  const robotoBold = fetch(new URL('../fonts/Roboto-Bold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: '128px',
          background: '#000000',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: 64,
            color: 'white',
          }}
        >
          <div>Next.js Jukebox</div>
          <div style={{ opacity: 0.6 }}>by candycode</div>
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
