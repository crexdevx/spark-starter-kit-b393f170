import { useEffect, useRef } from "react";
import cardioImg from "../assets/program-cardio.webp.asset.json";
import fatlossImg from "../assets/program-fatloss.webp.asset.json";
import muscleImg from "../assets/program-muscle.webp.asset.json";
import personalImg from "../assets/program-personal.webp.asset.json";
import strengthImg from "../assets/program-strength.webp.asset.json";
import weightImg from "../assets/program-weight.webp.asset.json";

type Program = {
  title: string;
  description: string;
  image: string;
};

const PROGRAMS: Program[] = [
  {
    title: "Strength Training",
    description:
      "Build raw power with progressive barbell and compound lift programming.",
    image: strengthImg.url,
  },
  {
    title: "Weight Training",
    description:
      "Master free weights and machines with structured, form-first coaching.",
    image: weightImg.url,
  },
  {
    title: "Cardio & Conditioning",
    description:
      "Boost stamina and endurance with heart-pumping conditioning circuits.",
    image: cardioImg.url,
  },
  {
    title: "Personal Training",
    description:
      "One-on-one coaching tailored to your goals, pace, and experience.",
    image: personalImg.url,
  },
  {
    title: "Muscle Building",
    description:
      "Hypertrophy-focused splits designed to add lean, lasting muscle mass.",
    image: muscleImg.url,
  },
  {
    title: "Fat Loss",
    description:
      "High-energy training and guidance to burn fat and reveal definition.",
    image: fatlossImg.url,
  },
];

/** Auto-scroll speed in px/second (auto-glide when not being dragged). */
const AUTO_SPEED = 80;

/**
 * "Our Programs" section.
 *
 * Black background with gold accents. Program cards glide horizontally in an
 * infinite loop; the track can also be dragged with a finger (touch) or the
 * mouse, with a little momentum after release. Pauses on hover/focus and the
 * auto-glide is disabled for users who prefer reduced motion.
 */
export function Programs() {
  // Duplicate the list so the loop can wrap seamlessly.
  const items = [...PROGRAMS, ...PROGRAMS];

  const trackRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    pos: 0,
    halfWidth: 0,
    autoPlay: true,
    hovered: false,
    dragging: false,
    lastPointerX: 0,
    lastMoveTime: 0,
    velocity: 0, // px/s, from the most recent drag movement
    momentum: 0, // px/s, decays after release
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const state = stateRef.current;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      state.autoPlay = false;
    }

    const measure = () => {
      state.halfWidth = track.scrollWidth / 2;
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    // Keep position within (-halfWidth, 0] so the loop is seamless in both directions.
    const wrap = () => {
      if (state.halfWidth <= 0) return;
      while (state.pos <= -state.halfWidth) state.pos += state.halfWidth;
      while (state.pos > 0) state.pos -= state.halfWidth;
    };

    let raf = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const autoAllowed =
        state.autoPlay && !state.dragging && !state.hovered && !reduceMotion;

      if (state.dragging) {
        // Position is updated directly in pointermove; decay stale velocity.
        state.velocity *= 0.8;
      } else if (Math.abs(state.momentum) > 4) {
        // Momentum glide after a flick, decaying back into the auto speed.
        state.pos += state.momentum * dt;
        state.momentum *= Math.pow(0.06, dt);
        if (autoAllowed) state.pos -= AUTO_SPEED * dt;
      } else {
        state.momentum = 0;
        if (autoAllowed) state.pos -= AUTO_SPEED * dt;
      }

      wrap();
      track.style.transform = `translate3d(${state.pos}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      state.dragging = true;
      state.momentum = 0;
      state.lastPointerX = e.clientX;
      state.lastMoveTime = performance.now();
      state.velocity = 0;
      track.setPointerCapture(e.pointerId);
      track.classList.add("cursor-grabbing");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!state.dragging) return;
      const dx = e.clientX - state.lastPointerX;
      state.lastPointerX = e.clientX;
      const now = performance.now();
      const dt = Math.max((now - state.lastMoveTime) / 1000, 0.001);
      state.lastMoveTime = now;
      state.pos += dx;
      state.velocity = state.velocity * 0.6 + (dx / dt) * 0.4;
      wrap();
    };

    const endDrag = () => {
      if (!state.dragging) return;
      state.dragging = false;
      track.classList.remove("cursor-grabbing");
      // Carry the flick forward as momentum (velocity sampled from the drag).
      if (performance.now() - state.lastMoveTime < 120) {
        state.momentum = Math.max(
          -2400,
          Math.min(2400, state.velocity * 0.9)
        );
      }
    };

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") state.hovered = true;
    };
    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") state.hovered = false;
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("lostpointercapture", endDrag);
    track.addEventListener("pointerenter", onPointerEnter);
    track.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("lostpointercapture", endDrag);
      track.removeEventListener("pointerenter", onPointerEnter);
      track.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="bg-surface-pure text-on-pure"
    >
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <header className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold sm:text-base">
            Train With Purpose
          </p>
          <h2
            id="programs-heading"
            className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Our Programs
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-1 w-20 bg-gold"
          />
        </header>
      </div>

      {/* Infinite horizontal loop — auto-glides and can be swiped with a finger */}
      <div className="group relative mt-12 overflow-hidden pb-16 lg:pb-24">
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-pure to-transparent sm:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-pure to-transparent sm:w-28"
        />

        <div
          ref={trackRef}
          className="flex w-max cursor-grab touch-pan-y select-none gap-6 pl-6 motion-reduce:justify-center motion-reduce:pr-6"
        >
          {items.map((program, index) => (
            <article
              key={`${program.title}-${index}`}
              aria-hidden={index >= PROGRAMS.length}
              className="w-72 shrink-0 overflow-hidden rounded-2xl border border-on-pure/10 bg-card/5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] sm:w-80"
            >
              <div className="relative h-44 overflow-hidden sm:h-52">
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  draggable={false}
                  width={768}
                  height={512}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-500"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-surface-pure/80 via-transparent to-transparent"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl uppercase tracking-wide text-gold">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-on-pure/80">
                  {program.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
