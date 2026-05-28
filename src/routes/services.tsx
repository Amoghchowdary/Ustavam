import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — UTSAVAM" },
      { name: "description", content: "Convention venues, full-service event management and traditional cultural ceremonies." },
      { property: "og:title", content: "Services — UTSAVAM" },
      { property: "og:description", content: "Convention venues, full-service event management and traditional cultural ceremonies." },
    ],
  }),
  component: Services,
});

const pillars = [
  {
    title: "Convention Venue",
    blurb: "Three distinct halls for gatherings of 80 to 1,000 — fully air-conditioned, with valet, in-house catering and bridal suites.",
    items: ["Pillarless main hall", "Stage & lighting", "In-house catering", "Bridal & green rooms", "Ample parking", "Audio / video crew"],
  },
  {
    title: "Event Management",
    blurb: "Weddings, receptions, corporate galas, milestone birthdays — planned, coordinated and delivered end-to-end.",
    items: ["Theme & decor design", "Vendor curation", "Hospitality & logistics", "Day-of coordination", "Photo & videography", "Guest accommodation"],
  },
  {
    title: "Cultural Ceremonies",
    blurb: "Traditional Kerala rituals — Muhurtham, Tali Kettu, Sadhya, Pulikali, classical performances — performed with authenticity.",
    items: ["Vedic priests & rituals", "Traditional Sadhya", "Classical music & dance", "Cultural performances", "Heritage decor", "Ayurvedic rituals"],
  },
];

const packages = [
  { name: "Muhurtham", price: "₹ 1.5L+", note: "Half-day cultural ceremony", features: ["Hall 4 hrs", "Sadhya for 100", "Priest & rituals", "Basic decor"] },
  { name: "Vivaha", price: "₹ 4.5L+", note: "Full wedding day", features: ["Main hall + bridal suite", "Sadhya for 300", "Mandapam decor", "Photography", "Coordination"] },
  { name: "Mahotsavam", price: "₹ 9L+", note: "Multi-day celebration", features: ["All venues", "500+ guests", "Custom decor & catering", "Cultural programme", "Full management"] },
];

function Services() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Services</div>
        <h1 className="font-display text-5xl md:text-6xl max-w-3xl leading-tight">
          Everything for the celebration — under one roof.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 space-y-px bg-border">
        {pillars.map((p, i) => (
          <div key={p.title} className="bg-background grid lg:grid-cols-12 gap-8 p-10 lg:p-16">
            <div className="lg:col-span-1 text-gold font-display text-3xl">0{i + 1}</div>
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl">{p.title}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{p.blurb}</p>
            </div>
            <ul className="lg:col-span-6 grid sm:grid-cols-2 gap-3 text-sm">
              {p.items.map((it) => (
                <li key={it} className="flex gap-2 text-foreground/80">
                  <Check size={16} className="text-gold mt-1 shrink-0" /> {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <SectionHeading eyebrow="Packages" title="Curated, transparent." center />
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {packages.map((p, i) => (
            <div key={p.name} className={`p-10 border ${i === 1 ? "bg-foreground text-background border-foreground" : "border-border"}`}>
              <div className={`text-xs uppercase tracking-[0.2em] ${i === 1 ? "text-gold" : "text-taupe"}`}>{p.note}</div>
              <h3 className="mt-4 font-display text-3xl">{p.name}</h3>
              <div className={`mt-2 text-2xl ${i === 1 ? "text-gold" : "text-foreground"}`}>{p.price}</div>
              <ul className={`mt-8 space-y-3 text-sm ${i === 1 ? "text-background/80" : "text-muted-foreground"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check size={14} className="text-gold mt-1 shrink-0" /> {f}</li>
                ))}
              </ul>
              <Button asChild className={`mt-10 w-full rounded-none ${i === 1 ? "bg-gold text-gold-foreground hover:bg-gold/90" : "bg-foreground text-background hover:bg-foreground/90"}`}>
                <Link to="/book">Enquire</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">Prices indicative. Customised on request.</p>
      </section>
    </>
  );
}
