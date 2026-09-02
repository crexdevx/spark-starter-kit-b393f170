/**
 * "Why Choose Us" section.
 *
 * Light-yellow background with a single white-text paragraph covering the
 * six reasons members train at Sky Lifting Club.
 */
export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="bg-membership"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2
          id="why-choose-us-heading"
          className="font-display text-3xl uppercase tracking-tight text-on-pure sm:text-4xl"
        >
          Why Choose Us
        </h2>
        <p className="mt-6 text-base font-semibold leading-relaxed text-on-pure sm:text-lg lg:text-xl">
          At Sky Lifting Club, you train with professional equipment — quality
          machines and weights for strength and fitness training — inside a
          strength-focused environment built for people serious about improving.
          Expert guidance from trainers who help you train safely and
          effectively, personalized training based on your individual fitness
          goals, and a clean, comfortable space that keeps you organized and
          consistent. Above all, you join a supportive community with a
          motivating atmosphere where members stay consistent and rise together.
        </p>
      </div>
    </section>
  );
}
