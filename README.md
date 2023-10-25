&nbsp;

&nbsp;

<p align="center">
  <a href="https://candycode.com"><img src="https://storage.googleapis.com/candycode/candycode.svg" height="64" alt="candycode"></a>
</p>

&nbsp;

&nbsp;

# Next.js Jukebox

live demo: https://jukebox.candycode.com

Explore or clone this repository to see how all the pieces of our Next.js Conf talk fit together in a fun Next.js jukebox application powered by Tailwind CSS and Framer Motion.

Then continue reading below to learn how to apply these techniques to your own web projects. It assumes you're using the Next.js app router with Tailwind CSS, but can be adapted to work in other contexts as well. See the [official Next.js docs](https://nextjs.org/docs) for more details.

## next/font

### Google Fonts

Self-hosting Google Fonts on your own domain can be done by importing the font from the `next/font/google` bundle.

```jsx
// ~/app/layout.js
import { Roboto } from 'next/font/google';
import cx from 'classnames';

export default function App({ children }) {
  return (
    <html lang="en">
      <body className={cx(roboto.variable, 'any other classes')}>{children}</body>
    </html>
  );
}

const roboto = Roboto({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
```

```jsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        roboto: 'var(--font-roboto), serif',
      },
    },
  },
};
```

```jsx
// component.js
export const Component = () => {
  return <div className="font-roboto font-bold">This is in Roboto bold</div>;
};
```

### Local fonts

If you want to supply your own local font files, the syntax for `next/font/local` is a bit different.

```jsx
// ~/app/layout.js
import localFont from 'next/font/local';
import cx from 'classnames';

export default function App({ children }) {
  return (
    <html lang="en">
      <body className={cx(foundersGrotesk.variable, 'any other classes')}>{children}</body>
    </html>
  );
}

const foundersGrotesk = localFont({
  src: [
    {
      path: '../fonts/founders-grotesk-regular.woff2',
      weight: '400',
      style: 'normal',
      display: 'swap',
    },
    // add each weight and style combination
  ],
  variable: '--founders-grotesk',
});
```

```jsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'founders-grotesk': 'var(--font-founders-grotesk), serif',
      },
    },
  },
};
```

```jsx
// component.js
export const Component = () => {
  return <div className="font-founders-grotesk">This is in Founders Grotesk</div>;
};
```

### Prevent font swapping

If you want to ensure that your type is only ever rendered in the custom web font even for those on slower connections, you can change the font display property to block rendering the type until the web font is loaded.

```diff
- display: 'swap',
+ display: 'block',
```

## next/image

### Optimizing an image

The required [props](https://nextjs.org/docs/app/api-reference/components/image) are determined based on whether you're loading a static file from the `public` directory (below), loading from a headless CMS, or importing an image file directly.

```jsx
// component.js
import Image from 'next/image';

export const Component = () => {
  return (
    <>
      <Image src="/jukebox.png" height={640} width={480} alt="A jukebox in a dive bar" />
    </>
  );
};
```

### Opt out of lazy loading

For images that appear above the fold of a web page, you'll want to to opt out of lazy loading to ensure the image loads eagerly as fast as possible.

```diff
- <Image />
+ <Image priority />
```

### Add a blurred placeholder

Instead of leaving an empty space before images load, add a solid color or low resolution preview as a placeholder. The blur data hash may be supplied automatically from your CMS, but could also be generated manually using [third-party tools](https://blurha.sh/).

```diff
- <Image />
+ <Image placeholder="blur" blurDataURL="data:image/png;base64,XXXXXXXXXX..." />
```

###

## app router

### Rendering a dynamic route page

```jsx
// ~/app/section/[slug]/page.js
export default function SectionPage({ params }) {
  return (
    <>
      <div>content for {params.slug}</div>
    </>
  );
}
```

### Intercepting a dynamic route in a modal

```jsx
// ~/app/@modal/(.)section/[slug]/page.js
import { Modal } from '~/components/modal';

export default function SectionModal({ params }) {
  return (
    <Modal>
      <div>content for {params.slug}</div>
    </Modal>
  );
}
```

```jsx
// ~/app/@modal/default.js
export default function Default() {
  return null;
}
```

```jsx
// ~/app/layout.js
export default function App(props) {
  return (
    <html lang="en">
      <body>
        {props.children}
        {props.modal}
      </body>
    </html>
  );
}
```

### Animating shared elements

If an element is shared between two pages, you can animate a transition using Framer Motion.

```jsx
// ~/app/page.js
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  const slug = 'yourPageSlug';

  return (
    <>
      <h1>Home page</h1>
      <section>
        <motion.h3 layout layoutId={`${slug}-headline`}>
          {slug}
        </motion.h3>
        <Link href={`/section/${slug}`}>Visit {slug}</Link>
      </section>
    </>
  );
}
```

```jsx
// ~/app/section/[slug]/page.js
import { motion } from 'framer-motion';

export default function SectionPage({ params }) {
  return (
    <div>
      <motion.h1 layout layoutId={`${params.slug}-headline`}>
        {params.slug}
      </motion.h1>
    </div>
  );
}
```

```jsx
// ~/app/@modal/(.)section/[slug]/page.js
import { motion } from 'framer-motion';

import { Modal } from '~/components/modal';

export default function SectionModal({ params }) {
  return (
    <Modal>
      <div>
        <motion.h2 layout layoutId={`${params.slug}-headline`}>
          {params.slug}
        </motion.h2>
      </div>
    </Modal>
  );
}
```

## next/server

### Generate social media card images

```jsx
// ~/app/section/[slug]/opengraph-image.js
import { ImageResponse } from 'next/server';

export default async function OpenGraphImage({ params }) {
  const foundersGroteskRegular = fetch(
    new URL('../../../fonts/founders-grotesk-regular.otf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'black',
          fontSize: 128,
          color: 'white',
        }}
      >
        {params.slug}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Founders Grotesk',
          data: await foundersGroteskRegular,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
}

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export const alt = 'OpenGraph image alternate text';

export const runtime = 'edge';
```
