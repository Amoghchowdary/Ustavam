import { createFileRoute } from "@tanstack/react-router";
import { Photo } from "@/components/site/Photo";
import { useState } from "react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — UTSAVAM" },
      { name: "description", content: "Weddings, receptions, corporate gatherings and cultural ceremonies hosted at UTSAVAM." },
      { property: "og:title", content: "Gallery — UTSAVAM" },
      { property: "og:description", content: "A visual archive of celebrations at UTSAVAM." },
    ],
  }),
  component: Gallery,
});

const items = [
  { cat: "Weddings", label: "Wedding mandapam", ratio: "portrait" as const },
  { cat: "Weddings", label: "Bridal moment", ratio: "landscape" as const },
  { cat: "Cultural", label: "Sadhya seating", ratio: "landscape" as const },
  { cat: "Receptions", label: "Reception stage", ratio: "portrait" as const },
  { cat: "Corporate", label: "Conference setup", ratio: "landscape" as const },
  { cat: "Cultural", label: "Classical dance", ratio: "portrait" as const },
  { cat: "Weddings", label: "Floral arch", ratio: "landscape" as const },
  { cat: "Receptions", label: "Couple portrait", ratio: "portrait" as const },
  { cat: "Cultural", label: "Lamp lighting", ratio: "landscape" as const },
  { cat: "Corporate", label: "Gala dinner", ratio: "portrait" as const },
  { cat: "Weddings", label: "Mehendi corner", ratio: "landscape" as const },
  { cat: "Cultural", label: "Pulikali", ratio: "portrait" as const },
];

const cats = ["All", "Weddings", "Receptions", "Cultural", "Corporate"] as const;

function Gallery() {
  const [filter, setFilter] = useState<(typeof cats)[number]>("All");
  const filtered = filter === "All" ? items : items.filter((i) => i.cat === filter);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10">
        <div className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Gallery</div>
        <h1 className="font-display text-5xl md:text-6xl">A visual archive.</h1>
        <p className="mt-4 text-sm text-muted-foreground italic">Photos coming soon — drop your Google Business gallery to populate this page.</p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap gap-3 border-b border-border pb-6">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-colors ${
                filter === c ? "border-foreground bg-foreground text-background" : "border-border hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12 grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((i, idx) => (
          <Photo key={idx} ratio={i.ratio} label={i.label} />
        ))}
      </section>
    </>
  );
}
