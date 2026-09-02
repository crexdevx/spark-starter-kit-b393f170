import { useCallback, useEffect, useState } from "react";

import g1 from "../assets/gallery-1.webp.asset.json";
import g2 from "../assets/gallery-2.webp.asset.json";
import g3 from "../assets/gallery-3.webp.asset.json";
import g4 from "../assets/gallery-4.webp.asset.json";
import g5 from "../assets/gallery-5.webp.asset.json";
import g8 from "../assets/gallery-8.webp.asset.json";
import g9 from "../assets/gallery-9.webp.asset.json";
import g10 from "../assets/gallery-10.webp.asset.json";

type Shot = { url: string; alt: string };

const SHOTS: Shot[] = [
  { url: g9.url, alt: "Bench press racks under magenta neon lighting" },
  { url: g10.url, alt: "Row of adjustable benches beside dumbbell racks" },
  { url: g5.url, alt: "Member flexing in front of the mirror wall" },
  { url: g8.url, alt: "Treadmills lined along the floor-to-ceiling windows" },
  { url: g2.url, alt: "Plate-loaded machines in the strength zone" },
  { url: g1.url, alt: "Barbell and dumbbell racks in the free weights area" },
  { url: g3.url, alt: "Members training together on the gym floor" },
  { url: g4.url, alt: "Overhead shot of a member on the training floor" },
];

/**
 * Per-photo placement for the grouped "pile" collage. A small rotation and
 * offset makes the shots read as a scattered stack of polaroids rather than a
 * flat grid.
 */
const PLACEMENT: { rotate: string; offset: string }[] = [
  { rotate: "-6deg", offset: "0rem 0rem" },
  { rotate: "4deg", offset: "0.25rem 0.5rem" },
  { rotate: "-3deg", offset: "0rem 0.25rem" },
  { rotate: "5deg", offset: "0.25rem 0rem" },
  { rotate: "-5deg", offset: "0rem 0.5rem" },
  { rotate: "3deg", offset: "0.25rem 0.25rem" },
  { rotate: "-4deg", offset: "0rem 0rem" },
  { rotate: "6deg", offset: "0.25rem 0.5rem" },
];

/**
 * "Gallery" section — a scattered cluster of photos that reads as a grouped
 * pile. Tapping any shot opens a full-screen lightbox with next/prev and Esc.
 */
export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback((delta: number) => {
    setOpenIndex((current) =>
      current === null
        ? current
        : (current + delta + SHOTS.length) % SHOTS.length
    );
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : SHOTS[openIndex];

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-surface-pure text-on-pure"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold sm:text-base">
            Inside The Club
          </p>
          <h2
            id="gallery-heading"
            className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Gallery
          </h2>
          <div aria-hidden="true" className="mx-auto mt-6 h-1 w-20 bg-gold" />
          <p className="mx-auto mt-5 max-w-xl text-sm font-medium text-on-pure/70 sm:text-base">
            A glimpse of the floor — tap any photo to view it full screen.
          </p>
        </header>

        {/* Grouped collage: a scattered pile of polaroid-style tiles */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-5">
          {SHOTS.map((shot, index) => {
            const place = PLACEMENT[index % PLACEMENT.length] ?? PLACEMENT[0]!;
            return (
              <button
                key={shot.url}
                type="button"
                onClick={() => setOpenIndex(index)}
                style={{ transform: `rotate(${place.rotate})` }}
                className="group relative block w-[calc(50%-0.75rem)] shrink-0 overflow-hidden rounded-xl border-4 border-on-pure bg-on-pure p-1 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:z-10 hover:scale-105 hover:rotate-0 focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-gold sm:w-56 sm:p-2"
                aria-label={`View photo: ${shot.alt}`}
              >
                <img
                  src={shot.url}
                  alt={shot.alt}
                  loading="lazy"
                  className="aspect-square w-full rounded-md object-cover"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-1 rounded-md bg-gradient-to-t from-surface-pure/70 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-20"
                />
              </button>
            );
          })}
        </div>
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-surface-pure/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close photo"
            className="absolute right-4 top-4 rounded-full border border-on-pure/20 px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-pure hover:border-gold hover:text-gold"
          >
            Close
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-on-pure/20 px-3 py-2 text-lg text-on-pure hover:border-gold hover:text-gold sm:left-6"
          >
            &#8249;
          </button>

          <img
            src={active.url}
            alt={active.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
          />

          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-on-pure/20 px-3 py-2 text-lg text-on-pure hover:border-gold hover:text-gold sm:right-6"
          >
            &#8250;
          </button>

          <span
            aria-hidden="true"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-on-pure/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-pure/80"
          >
            {(openIndex ?? 0) + 1} / {SHOTS.length}
          </span>
        </div>
      ) : null}
    </section>
  );
}
