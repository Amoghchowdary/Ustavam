import { createFileRoute, Link } from "@tanstack/react-router";
import { Photo } from "@/components/site/Photo";
import { Button } from "@/components/ui/button";
import { Users, Maximize2, Car, UtensilsCrossed } from "lucide-react";

export const Route = createFileRoute("/venues")({
  head: () => ({
    meta: [
      { title: "Venues — UTSAVAM" },
      { name: "description", content: "Three distinct halls for 80 to 1,000 guests — with amenities, capacity and bookable dates." },
      { property: "og:title", content: "Venues — UTSAVAM" },
      { property: "og:description", content: "Three distinct halls for 80 to 1,000 guests." },
    ],
  }),
  component: Venues,
});

const venues = [
  {
    name: "Mahasthana Hall",
    tag: "Grand Convention",
    capacity: "Up to 1,000 guests",
    area: "14,000 sq ft, pillarless",
    parking: "150 cars",
    catering: "Full kitchen",
    blurb: "Our flagship pillarless hall, designed for grand weddings and conventions. Soaring ceilings, modular stage, and full audio-visual.",
  },
  {
    name: "Lotus Mandapam",
    tag: "Traditional Ceremonies",
    capacity: "Up to 400 guests",
    area: "6,000 sq ft",
    parking: "60 cars",
    catering: "Traditional Sadhya",
    blurb: "A heritage-styled mandapam for cultural ceremonies — wooden columns, traditional lamps, an open-sided design.",
  },
  {
    name: "Aranya Garden",
    tag: "Open-Air",
    capacity: "Up to 250 guests",
    area: "Landscaped lawn",
    parking: "40 cars",
    catering: "Live counters",
    blurb: "An intimate outdoor space, framed by mango trees and string lights. Ideal for receptions and engagements.",
  },
];

function Venues() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Venues</div>
        <h1 className="font-display text-5xl md:text-6xl max-w-3xl leading-tight">
          Three spaces, one address.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
          From a grand 1,000-guest hall to an intimate garden, choose the setting that suits the rhythm of your celebration.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 space-y-16 lg:space-y-24 pb-12">
        {venues.map((v, i) => (
          <div key={v.name} className={`grid lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
            <div className="lg:col-span-7 [direction:ltr]">
              <Photo ratio="landscape" label={v.name} />
            </div>
            <div className="lg:col-span-5 [direction:ltr]">
              <div className="text-xs uppercase tracking-[0.3em] text-gold">{v.tag}</div>
              <h2 className="mt-3 font-display text-4xl">{v.name}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{v.blurb}</p>
              <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
                <div><Users size={16} className="text-gold" /><dt className="text-xs uppercase tracking-wider text-taupe mt-2">Capacity</dt><dd>{v.capacity}</dd></div>
                <div><Maximize2 size={16} className="text-gold" /><dt className="text-xs uppercase tracking-wider text-taupe mt-2">Area</dt><dd>{v.area}</dd></div>
                <div><Car size={16} className="text-gold" /><dt className="text-xs uppercase tracking-wider text-taupe mt-2">Parking</dt><dd>{v.parking}</dd></div>
                <div><UtensilsCrossed size={16} className="text-gold" /><dt className="text-xs uppercase tracking-wider text-taupe mt-2">Catering</dt><dd>{v.catering}</dd></div>
              </dl>
              <Button asChild className="mt-10 rounded-none bg-foreground text-background hover:bg-foreground/90 px-6">
                <Link to="/book">Check availability</Link>
              </Button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
