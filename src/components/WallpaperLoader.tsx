import { useState, useEffect, ReactNode } from 'react';
import Loader from './Loader';

/**
 * All wallpapers used by the app.
 * Keep this list in sync with src/lib/styles.ts.
 */
const WALLPAPERS = [
  '/gradient-blue-background/backg2.jpg',
  '/gradient-blue-background/backg3.jpg',
  '/gradient-blue-background/backg4.jpg',
];

interface WallpaperLoaderProps {
  children: ReactNode;
}

/**
 * Preloads all wallpaper images before rendering children.
 * Shows the pencil loading animation until every image has fired
 * its `load` (or `error`) event, then fades in the page content.
 */
const WallpaperLoader = ({ children }: WallpaperLoaderProps) => {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false); // for fade-in

  useEffect(() => {
    let settled = 0;

    const onSettled = () => {
      settled += 1;
      if (settled === WALLPAPERS.length) {
        // All images loaded (or failed) – reveal the page
        setReady(true);
        // Tiny delay so the fade-in class is applied after the element mounts
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true));
        });
      }
    };

    const imgs = WALLPAPERS.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = onSettled;
      img.onerror = onSettled; // don't block on a missing file
      return img;
    });

    return () => {
      // Clean up handlers to avoid state updates after unmount
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  if (!ready) {
    return <Loader />;
  }

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      {children}
    </div>
  );
};

export default WallpaperLoader;
