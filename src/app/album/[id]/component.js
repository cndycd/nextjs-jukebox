'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { albums } from '~/data';

const MotionImage = motion(Image);

export const Component = ({ params }) => {
  const slug = params.id;
  const { type, title, artist, year, tracks, length, color } = albums[slug];

  return (
    <div className="flex h-[100svh] flex-col bg-black md:p-8 xl:p-16">
      <div className="h-full w-full flex-grow overflow-clip rounded bg-gray-900 p-8 xl:p-16">
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
              <div className="mt-8 xl:mt-16">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center overflow-clip rounded bg-black/25 px-8 py-4 text-xl text-white"
                >
                  Full Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
