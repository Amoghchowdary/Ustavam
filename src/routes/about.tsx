import { createFileRoute } from "@tanstack/react-router";
import { Photo } from "@/components/site/Photo";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — UTSAVAM" },
      { name: "description", content: "Our story, philosophy and the team behind UTSAVAM — a Kerala house of celebrations." },
      { property: "og:title", content: "About — UTSAVAM" },
      { property: "og:description", content: "A Kerala house of celebrations, built on craft, tradition and quiet hospitality." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-16">
        <div className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Our Story</div>
        <h1 className="font-display text-5xl md:text-6xl max-w-3xl leading-tight">
          Twelve years of crafting <em className="text-gold not-italic">utsavam</em> — the Sanskrit word for joyful gathering.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-start">
        <Photo ratio="portrait" label="Founders / venue" />
        <div className="space-y-6 text-muted-foreground leading-relaxed lg:pt-10">
          <p>
            UTSAVAM began as a single auditorium and a promise — that no two celebrations would feel the same. Today we stretch across three venues, a planning studio and a cultural ceremonies practice rooted in Kerala tradition.
          </p>
          <p>
            We believe a great celebration is felt before it is seen. In the temperature of the room, the timing of the meal, the silence before the music begins. Every wedding, reception and corporate gathering we host is shaped by that quiet attention.
          </p>
          <p>
            From the first call to the final farewell, a single coordinator stays with you. Your family is treated as ours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <SectionHeading eyebrow="What guides us" title="Values, lightly held." />
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-border">
          {[
            ["Restraint", "Less, but better. Space matters as much as ornament."],
            ["Reverence", "Rituals performed with care, never as performance."],
            ["Responsibility", "Local artisans, ethical sourcing, mindful service."],
          ].map(([t, d]) => (
            <div key={t} className="bg-background p-10">
              <h3 className="text-2xl">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
