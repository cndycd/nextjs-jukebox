import { Roboto } from 'next/font/google';

import { Providers } from '~/components/providers';
import { Wrapper } from '~/components/wrapper';
import '../styles/index.css';

const roboto = Roboto({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'block',
  variable: '--font-roboto',
});

export default function App(props) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Providers>
          <Wrapper>
            {props.children}
            {props.modal}
          </Wrapper>
        </Providers>
      </body>
    </html>
  );
}

/** @type {import("next").Metadata} */
export const metadata = {
  openGraph: {
    locale: 'en',
    siteName: 'Next.js x candycode',
    type: 'website',
    images: {
      url: '/preview.png',
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: '/favicon.svg',
  metadataBase: 'https://jukebox.candycode.com',
};
