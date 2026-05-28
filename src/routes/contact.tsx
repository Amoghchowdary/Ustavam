import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — UTSAVAM" },
      { name: "description", content: "Visit, call or message UTSAVAM. We respond within 24 hours." },
      { property: "og:title", content: "Contact — UTSAVAM" },
      { property: "og:description", content: "Visit, call or message UTSAVAM." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  message: z.string().trim().min(5).max(800),
});

const WA_NUMBER = "910000000000";

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const sendWhatsApp = () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Please fill all fields");
      return;
    }
    const text = `Hello UTSAVAM — I'm ${parsed.data.name} (${parsed.data.phone}).\n\n${parsed.data.message}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Contact</div>
        <h1 className="font-display text-5xl md:text-6xl max-w-3xl leading-tight">
          Let's talk about your celebration.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-12 pb-24">
        <div className="space-y-10">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">Visit</h3>
            <div className="flex gap-3 text-foreground/90">
              <MapPin size={18} className="text-gold mt-1 shrink-0" />
              <p>UTSAVAM Convention Centre<br />Kerala, India — 680000</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">Speak</h3>
            <div className="space-y-2">
              <a href="tel:+910000000000" className="flex gap-3 items-center hover:text-gold"><Phone size={18} className="text-gold" /> +91 00000 00000</a>
              <a href="mailto:hello@utsavam.in" className="flex gap-3 items-center hover:text-gold"><Mail size={18} className="text-gold" /> hello@utsavam.in</a>
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="flex gap-3 items-center hover:text-gold"><MessageCircle size={18} className="text-gold" /> WhatsApp us</a>
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">Hours</h3>
            <p className="text-foreground/90">Mon — Sat &nbsp; 9:00 – 19:00<br />Sun &nbsp; By appointment</p>
          </div>
        </div>

        <div className="border border-border p-8 md:p-10 bg-background">
          <h2 className="font-display text-3xl">Send an enquiry</h2>
          <p className="mt-2 text-sm text-muted-foreground">Tap send — we'll open WhatsApp with your message pre-filled.</p>
          <div className="mt-8 space-y-5">
            <div>
              <Label className="text-xs uppercase tracking-wider text-taupe">Name</Label>
              <Input className="mt-2 rounded-none h-12" maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-taupe">Phone</Label>
              <Input className="mt-2 rounded-none h-12" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-taupe">Message</Label>
              <Textarea className="mt-2 rounded-none" rows={5} maxLength={800} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <Button onClick={sendWhatsApp} className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90 h-12">
              Send via WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
