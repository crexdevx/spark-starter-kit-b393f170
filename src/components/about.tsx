/**
 * About section for Sky Lifting Club.
 *
 * - Pure black background with high-contrast light typography.
 * - Semantic HTML and naturally placed location/keyword copy for SEO.
 * - Fully responsive two-column layout on desktop.
 */
export function About() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sky Lifting Club",
    description:
      "The biggest gym in Nalbari and a leading fitness destination in Assam, built on Honor, Discipline, and Respect.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Billeswar/Barnarddi, Nalbari",
      addressRegion: "Assam",
      postalCode: "781303",
      addressCountry: "IN",
    },
    areaServed: "Nalbari, Assam",
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-surface-pure text-on-pure"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <header>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold sm:text-base">
              The biggest gym in Nalbari
            </p>
            <h2
              id="about-heading"
              className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Sky Lifting Club — Nalbari, Assam
            </h2>
            <div
              className="mt-6 h-1 w-20 bg-gold"
              aria-hidden="true"
            />
          </header>

          <div className="space-y-5 text-base font-medium text-on-pure/80 sm:text-lg">
            <p>
              Sky Lifting Club is the biggest gym in Nalbari and a leading
              fitness destination in Assam. Located in Billeswar/Barnarddi,
              Assam 781303, we have built a space where serious training meets
              unwavering support.
            </p>
            <p>
              Our culture is rooted in{" "}
              <strong className="text-on-pure">Honor</strong>,{" "}
              <strong className="text-on-pure">Discipline</strong>, and{" "}
              <strong className="text-on-pure">Respect</strong>. Every session
              is a chance to build strength, consistency, and character
              alongside a community that pushes each other forward.
            </p>
            <p>
              Whether you are stepping onto the gym floor for the first time or
              preparing for your next competition, Sky Lifting Club gives you
              the equipment, coaching, and environment to rise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
