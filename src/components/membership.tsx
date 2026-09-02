import { useEffect, useState } from "react";
import { Check } from "lucide-react";

type Plan = {
  name: string;
  duration: string;
  admission: string;
  price: string;
  total: string;
  perk?: string;
};

const PLANS: Record<"men" | "women", Plan[]> = {
  men: [
    {
      name: "Yearly",
      duration: "12 Months",
      admission: "FREE",
      price: "₹9,500",
      total: "₹9,500",
      perk: "PT – 1 Month PT Free",
    },
    {
      name: "Half Yearly",
      duration: "6 Months",
      admission: "₹700",
      price: "₹5,000",
      total: "₹5,700",
    },
    {
      name: "Monthly",
      duration: "1 Month",
      admission: "₹1,500",
      price: "₹1,000",
      total: "₹2,500",
    },
  ],
  women: [
    {
      name: "Yearly",
      duration: "12 Months",
      admission: "FREE",
      price: "₹8,000",
      total: "₹8,000",
      perk: "PT – 1 Month PT Free",
    },
    {
      name: "Half Yearly",
      duration: "6 Months",
      admission: "FREE",
      price: "₹4,500",
      total: "₹4,500",
    },
    {
      name: "Monthly",
      duration: "1 Month",
      admission: "FREE",
      price: "₹800",
      total: "₹800",
    },
  ],
};

const EXTRAS = [
  { label: "Freezing Charge", value: "₹300", note: "Duration – 1 Month" },
  { label: "Pay Per Visit", value: "₹100", note: "" },
  {
    label: "Re-Admission",
    value: "₹500",
    note: "Mandatory after an absence of 6 months",
  },
];

/**
 * Membership / fee structure section.
 *
 * Yellow section background, red cards with black text. Tap Men or Women to
 * switch fee structures; cards stand horizontally (scrollable on mobile).
 */
export function Membership() {
  const [tab, setTab] = useState<"men" | "women">("men");
  const [glowCards, setGlowCards] = useState(false);
  const plans = PLANS[tab];

  useEffect(() => {
    setGlowCards(true);
    const t = setTimeout(() => setGlowCards(false), 800);
    return () => clearTimeout(t);
  }, [tab]);

  return (
    <section
      id="membership"
      aria-labelledby="membership-heading"
      className="bg-membership text-on-membership"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] sm:text-base">
            Honor • Discipline • Respect
          </p>
          <h2
            id="membership-heading"
            className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Membership Fee Structure
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold sm:text-lg">
            {tab === "men"
              ? "Men's fee structure at Sky Lifting Club, Nalbari."
              : "Specially priced for women — making fitness more accessible & empowering."}
          </p>
        </header>

        {/* Men / Women toggle */}
        <div
          role="tablist"
          aria-label="Membership type"
          className="mx-auto mt-10 flex w-full max-w-xs items-center gap-2 rounded-full border-2 border-on-membership p-1"
        >
          {(["men", "women"] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`tab-${key}`}
              aria-selected={tab === key}
              aria-controls={`panel-${key}`}
              onClick={() => setTab(key)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                tab === key
                  ? "bg-membership-card text-on-membership-card"
                  : "text-on-membership hover:bg-on-membership/10"
              }`}
            >
              {key === "men" ? "Men" : "Women"}
            </button>
          ))}
        </div>

        {/* Horizontal card row */}
        <div
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0"
        >
          {plans.map((plan) => (
            <article
              key={`${tab}-${plan.name}`}
              className={`flex min-w-[17rem] flex-1 snap-start flex-col rounded-2xl bg-membership-card p-6 text-on-membership-card shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] ring-offset-2 ring-offset-membership transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 active:ring-2 active:ring-white/90 lg:min-w-0 ${
                glowCards
                  ? "ring-2 ring-white shadow-[0_0_30px_8px_rgba(255,255,255,0.45)]"
                  : ""
              }`}
              tabIndex={0}
            >
              <h3 className="font-display text-2xl uppercase tracking-wide">
                {plan.name}
              </h3>

              <dl className="mt-5 space-y-2 text-sm font-semibold">
                <div className="flex items-center justify-between border-b border-on-membership-card/25 pb-2">
                  <dt>Duration</dt>
                  <dd>{plan.duration}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-on-membership-card/25 pb-2">
                  <dt>Admission</dt>
                  <dd>{plan.admission}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-on-membership-card/25 pb-2">
                  <dt>Price</dt>
                  <dd>{plan.price}</dd>
                </div>
              </dl>

              {plan.perk ? (
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-on-membership-card/40 px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
                  <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {plan.perk}
                </p>
              ) : null}

              <div className="mt-auto pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.25em]">
                  Total
                </p>
                <p className="mt-1 font-display text-4xl leading-none">
                  {plan.total}
                </p>
              </div>

              <a
                href="tel:+919101376268"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-on-membership-card px-5 py-3 text-sm font-bold uppercase tracking-widest text-membership-card transition-transform hover:scale-[1.02]"
              >
                Join Now
              </a>
            </article>
          ))}
        </div>

        {/* Additional charges */}
        <div className="mt-12 rounded-2xl border-2 border-on-membership p-6">
          <h3 className="font-display text-xl uppercase tracking-wide">
            Other Charges
          </h3>
          <ul className="mt-4 space-y-3 text-sm font-semibold sm:text-base">
            {EXTRAS.map((extra) => (
              <li
                key={extra.label}
                className="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-on-membership/25 pb-2 last:border-0"
              >
                <span className="uppercase tracking-wide">{extra.label}</span>
                <span className="flex items-baseline gap-2">
                  <span className="font-display text-lg">{extra.value}</span>
                  {extra.note ? (
                    <span className="text-xs font-medium opacity-70">
                      ({extra.note})
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold">
            Call us:{" "}
            <a href="tel:+919101376268" className="underline">
              91013 76268
            </a>{" "}
            • Barnaddi, Nalbari, Assam-781303
          </p>
        </div>
      </div>
    </section>
  );
}
