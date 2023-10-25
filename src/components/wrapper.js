'use client';

import { usePathname } from 'next/navigation';

export const Wrapper = ({ children }) => {
  const pathname = usePathname();

  return (
    <div key={pathname} id="__next" className="font-roboto">
      {children}
    </div>
  );
};
