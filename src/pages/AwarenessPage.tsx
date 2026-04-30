import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TOTAL_FRAMES = 112;

function padFrame(n: number) {
  return n.toString().padStart(3, '0');
}

interface Overlay {
  range: [number, number];
  text: string;
  flex: string;
  pad: string;
  align: 'left' | 'right' | 'center';
  maxW: string;
}

const OVERLAYS: Overlay[] = [
  {
    range: [0, 15],
    text: 'Every child is born speaking the language of their home',
    flex: 'items-end justify-start',
    pad: 'pb-20 pl-14',
    align: 'left',
    maxW: '72vw',
  },
  {
    range: [20, 35],
    text: '250 million children worldwide lose their native tongue by age 10',
    flex: 'items-start justify-end',
    pad: 'pt-20 pr-14',
    align: 'right',
    maxW: '68vw',
  },
  {
    range: [40, 55],
    text: 'Children taught in their mother tongue show 40% better cognitive development',
    flex: 'items-center justify-start',
    pad: 'pl-14',
    align: 'left',
    maxW: '65vw',
  },
  {
    range: [60, 75],
    text: 'Regional dialects carry culture, identity and belonging',
    flex: 'items-end justify-end',
    pad: 'pb-20 pr-14',
    align: 'right',
    maxW: '70vw',
  },
  {
    range: [80, 100],
    text: 'A child who learns in their mother tongue doesnt just learn a subject — they learn who they are',
    flex: 'items-center justify-center',
    pad: 'px-10',
    align: 'center',
    maxW: '80vw',
  },
];

function overlayStyle(
  pct: number,
  [start, end]: [number, number],
): { opacity: number; y: number } {
  const FADE = 4;          // % to fade in / out
  const ENTRY_Y = 70;      // px below center where text begins
  const EXIT_Y = -80;      // px above center where text finishes

  const fullStart = start - FADE;
  const fullEnd = end + FADE;

  if (pct <= fullStart) return { opacity: 0, y: ENTRY_Y };
  if (pct >= fullEnd)   return { opacity: 0, y: EXIT_Y };

  const span = fullEnd - fullStart;
  const t = (pct - fullStart) / span; // 0 → 1 across full visible window

  const y = ENTRY_Y + (EXIT_Y - ENTRY_Y) * t;

  const fadeInEnd    = FADE / span;
  const fadeOutStart = 1 - FADE / span;
  let opacity: number;
  if (t < fadeInEnd)         opacity = t / fadeInEnd;
  else if (t > fadeOutStart) opacity = 1 - (t - fadeOutStart) / (1 - fadeOutStart);
  else                       opacity = 1;

  return { opacity, y };
}

export default function AwarenessPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>();
  const [loaded, setLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img?.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const x = (cw - img.naturalWidth * scale) / 2;
    const y = (ch - img.naturalHeight * scale) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }, []);

  // Preload all frames
  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/scroll-animation/ezgif-frame-${padFrame(i)}.jpg`;
      const finish = () => {
        done++;
        if (done === TOTAL_FRAMES) setLoaded(true);
      };
      img.onload = finish;
      img.onerror = finish;
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Size canvas to viewport on mount and resize
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // Draw first frame once all images are loaded
  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded, drawFrame]);

  // Scroll-driven frame updates
  useEffect(() => {
    if (!loaded) return;
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const top = container.getBoundingClientRect().top;
      const scrollable = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / scrollable));
      setScrollPct(progress * 100);
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
      if (frameIdx !== currentFrameRef.current) {
        currentFrameRef.current = frameIdx;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIdx));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, drawFrame]);

  return (
    <div className="bg-black text-white">
      {/* Back arrow — fixed top-left */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm tracking-wide">Back</span>
      </button>

      {/* Scroll animation container — tall enough to drive the full animation */}
      <div ref={containerRef} style={{ height: '500vh' }}>
        {/* Sticky viewport: canvas + text overlays — hidden until all frames are loaded */}
        <div
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.25s ease' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* "Why Language Matters" — top-right, fades out on scroll */}
          <div
            className="absolute top-6 right-8 pointer-events-none"
            style={{
              opacity: Math.max(0, 1 - scrollPct / 8),
              transition: 'opacity 0.08s linear',
            }}
          >
            <p
              style={{
                color: '#ce1717ff',
                fontWeight: 900,
                fontSize: 'clamp(3rem, 5vw, 5rem)',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                textShadow: '1px 1px 0px rgba(0,0,0,0.45), 0px 3px 14px rgba(0,0,0,0.75)',
                textAlign: 'center',
              }}
            >
              Why<br />Language<br />Matters
            </p>
          </div>

          {OVERLAYS.map(({ range, text, flex, pad, align, maxW }, i) => {
            const { opacity, y } = overlayStyle(scrollPct, range);
            return (
              <div
                key={i}
                className={`absolute inset-0 flex ${flex} ${pad} pointer-events-none`}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  transition: 'opacity 0.06s linear, transform 0.06s linear',
                }}
              >
                <p
                  style={{
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                    textAlign: align,
                    maxWidth: maxW,
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                    textShadow:
                      '2px 2px 0px rgba(0,0,0,0.55), 0px 4px 18px rgba(0,0,0,0.85)',
                  }}
                >
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
