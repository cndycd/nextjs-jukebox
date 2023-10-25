'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { catalog, albums } from '~/data';

const MotionImage = motion(Image);

export const Component = () => {
  return (
    <div className="flex items-center justify-center bg-gray-950 p-8 text-white">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {catalog.map((slug) => {
            const { title, artist } = albums[slug];

            return (
              <div key={slug} className="">
                <Link href={`/album/${slug}`} className="block min-h-full rounded bg-gray-900 p-8">
                  <div className="relative aspect-square overflow-clip rounded">
                    <MotionImage
                      layout
                      layoutId={slug}
                      transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                      src={`/covers/${slug}.jpg`}
                      alt={`${title} by ${artist}`}
                      fill
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
