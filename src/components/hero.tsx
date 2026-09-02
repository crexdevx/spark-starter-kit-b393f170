import posterUrl from "../assets/sky-lifting-hero-poster.jpg";
import heroVideo from "../assets/sky-lifting-hero.webm.asset.json";

/**
 * Homepage hero for Sky Lifting Club.
 *
 * Performance notes:
 * - A real poster image keeps LCP cheap and avoids layout shift
 *   (the section has a fixed 100svh height regardless of media load).
 * - All copy is real HTML text for SEO/accessibility.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex h-[100svh] w-full items-center justify-end overflow-hidden bg-background"
    >
      {/* Background media — autoplaying muted looped video over a poster fallback. */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo.url}
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/45 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      {/* Copy — left-aligned, left side of the screen */}
      <div className="relative z-10 w-full px-6 text-left sm:px-12 lg:px-16">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/90 sm:text-base sm:tracking-[0.35em]">
          Honor • Discipline • Respect
        </p>
        <h1
          id="hero-heading"
          className="mt-4 whitespace-nowrap font-display text-[2.6rem] uppercase leading-[0.9] tracking-tight text-yellow-400 drop-shadow-lg sm:text-8xl lg:text-[11rem]"
        >
          Sky Lifting Club
        </h1>

        <p className="mt-5 max-w-xl text-base font-semibold text-white/90 sm:text-lg">
          Train harder. Lift heavier. Rise together.
        </p>
        <a
          href="#join"
          className="mt-9 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-extrabold uppercase tracking-wider text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Join the Club
        </a>
      </div>
    </section>
  );
}
