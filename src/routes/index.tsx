import { createFileRoute, Link } from "@tanstack/react-router";
import { Photo } from "@/components/site/Photo";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Calendar, Users, Flower2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UTSAVAM — A House of Celebrations" },
      { name: "description", content: "Premier convention venue, event management and cultural ceremonies in Kerala. Book weddings, receptions and corporate events." },
      { property: "og:title", content: "UTSAVAM — A House of Celebrations" },
      { property: "og:description", content: "Premier convention venue, event management and cultural ceremonies in Kerala." },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Calendar, title: "Convention Venue", text: "Pillarless halls and intimate spaces, dressed for every occasion." },
  { icon: Sparkles, title: "Event Management", text: "End-to-end planning — décor, catering, logistics, coordination." },
  { icon: Flower2, title: "Cultural Ceremonies", text: "Traditional Kerala rituals performed with reverence and craft." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-20 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Est. — Kerala</div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02]">
              Where every<br />gathering becomes<br /><em className="text-gold not-italic">an utsavam.</em>
            </h1>
            <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
              A convention venue and event house crafting weddings, receptions and cultural ceremonies with quiet elegance and faithful tradition.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-8">
                <Link to="/book">Book a Date <ArrowRight className="ml-2" size={16} /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-foreground/20 hover:border-gold hover:text-gold px-8">
                <Link to="/venues">Explore Venues</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Photo ratio="portrait" label="Hero photo — hall / mandapam" />
          </div>
        </div>
      </section>

      {/* MARQUEE STATS */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["500+", "Events crafted"],
            ["12", "Years of legacy"],
            ["3", "Distinct venues"],
            ["4.9", "Avg. guest rating"],
          ].map(([k, v]) => (
            <div key={v}>
              <div className="font-display text-4xl text-foreground">{k}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-taupe">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <SectionHeading eyebrow="What we do" title="Three pillars, one philosophy." center />
        <div className="mt-16 grid md:grid-cols-3 gap-px bg-border">
          {services.map((s) => (
            <div key={s.title} className="bg-background p-10 hover:bg-secondary/30 transition-colors">
              <s.icon className="text-gold" size={28} strokeWidth={1.2} />
              <h3 className="mt-6 text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/services" className="text-sm tracking-wider uppercase border-b border-gold pb-1 hover:text-gold">
            All Services
          </Link>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeading eyebrow="Recent" title="Moments, preserved." />
          <Link to="/gallery" className="text-sm tracking-wider uppercase border-b border-gold pb-1 hover:text-gold">
            View Gallery
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Photo ratio="portrait" label="Wedding" />
          <Photo ratio="portrait" label="Mandapam" />
          <Photo ratio="portrait" label="Reception" />
          <Photo ratio="portrait" label="Cultural" />
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-secondary/30 border-y border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="text-gold text-5xl font-display leading-none">"</div>
          <p className="mt-4 font-display text-2xl md:text-3xl leading-snug text-foreground/90">
            Utsavam turned our daughter's wedding into a quiet, golden memory. Every detail — flowers, the mandapam, the meal — felt considered.
          </p>
          <div className="mt-8 text-xs uppercase tracking-[0.2em] text-taupe">— The Menon Family</div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="bg-foreground text-background p-12 md:p-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Users className="text-gold" size={28} strokeWidth={1.2} />
            <h2 className="mt-6 font-display text-4xl md:text-5xl">Reserve your date.</h2>
            <p className="mt-4 text-background/70 max-w-md">
              Check availability and hold your preferred hall in four simple steps.
            </p>
          </div>
          <div className="lg:text-right">
            <Button asChild size="lg" className="rounded-none bg-gold text-gold-foreground hover:bg-gold/90 px-10">
              <Link to="/book">Begin Booking <ArrowRight className="ml-2" size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
