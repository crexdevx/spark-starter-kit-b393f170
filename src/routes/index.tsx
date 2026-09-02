import { createFileRoute } from "@tanstack/react-router";

import { About } from "../components/about";
import { Hero } from "../components/hero";
import { Membership } from "../components/membership";
import { Programs } from "../components/programs";
import { WhyChooseUs } from "../components/why-choose-us";

import { siteConfig } from "../config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Sky Lifting Club | Honor • Discipline • Respect` },
      {
        name: "description",
        content:
          "Sky Lifting Club — a weightlifting community built on honor, discipline, and respect. Train harder, lift heavier, rise together.",
      },
      { property: "og:title", content: "Sky Lifting Club" },
      {
        property: "og:description",
        content:
          "A weightlifting community built on honor, discipline, and respect. Train harder, lift heavier, rise together.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteConfig.name },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <About />
      <Programs />
      <WhyChooseUs />
      <Membership />
    </main>
  );
}

