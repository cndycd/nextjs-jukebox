'use client';

import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion';

import { clicksAtom } from '~/atoms';
import { catalog, albums } from '~/data';

const MotionImage = motion(Image);

export const Component = ({ params }) => {
  const router = useRouter();
  const slug = params.id;
  const { type, title, artist, year, tracks, length, color } = albums[slug];
  const currentIndex = catalog.indexOf(slug);
  const previousIndex = currentIndex === 0 ? catalog.length - 1 : currentIndex - 1;
  const previousAlbum = catalog[previousIndex];
  const nextIndex = currentIndex === catalog.length - 1 ? 0 : currentIndex + 1;
  const nextAlbum = catalog[nextIndex];

  // this is a hack
  // router.push('/') should be sufficient to close the modal
  // see https://github.com/vercel/next.js/issues/49662
  const pathname = usePathname();
  const [clicks, setClicks] = useAtom(clicksAtom);
  useEffect(() => {
    const nextClicks = clicks + 1;
    setClicks(nextClicks);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  const handleCloseModal = useCallback(() => {
    if (clicks === 0) {
      router.back();
    } else {
      for (let i = 0; i < clicks; i++) {
        router.back();
      }
    }
    setClicks(0);
  }, [clicks]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-end justify-end bg-black/25 p-8 backdrop-blur xl:p-16">
      <div className="inline-block w-full">
        <div className="relative z-20 overflow-clip rounded" style={{ backgroundColor: color }}>
          <div className="flex flex-col gap-16 bg-gradient-to-b from-transparent to-black/75 p-8 xl:flex-row">
            <div className="relative aspect-square w-40 flex-shrink-0 overflow-clip rounded xl:w-80">
              <MotionImage
                layout
                layoutId={slug}
                transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                src={`/covers/${slug}.jpg`}
                alt={`${title} by ${artist}`}
                fill
              />
            </div>
            <div className="flex flex-grow flex-col">
              <div className="text-xs capitalize text-white opacity-60">{type}</div>
              <div className="mt-2 whitespace-nowrap text-4xl font-black text-white lg:text-6xl">
                {title}
              </div>
              <div className="mt-4 text-base text-white">
                <span className="font-bold">{artist}</span> • {year} • {tracks} songs,{' '}
                <span className="opacity-60">{length}</span>
              </div>
              <div className="mt-8 flex h-full flex-grow items-end justify-start gap-8 xl:gap-16">
                <Link
                  href={`/album/${previousAlbum}`}
                  className="inline-flex aspect-square w-16 items-center justify-center overflow-clip rounded bg-black/25 text-3xl text-white xl:w-44 xl:text-6xl"
                >
                  ←
                </Link>
                <Link
                  href={`/album/${nextAlbum}`}
                  className="inline-flex aspect-square w-16 items-center justify-center overflow-clip rounded bg-black/25 text-3xl text-white xl:w-44 xl:text-6xl"
                >
                  →
                </Link>
                <button
                  onClick={handleCloseModal}
                  className="inline-flex aspect-square w-16 items-center justify-center overflow-clip rounded bg-black/25 text-3xl text-white xl:w-44 xl:text-6xl"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
