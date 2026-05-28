import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Date — UTSAVAM" },
      { name: "description", content: "Reserve your venue at UTSAVAM in four simple steps. Check availability, choose your hall and confirm." },
      { property: "og:title", content: "Book a Date — UTSAVAM" },
      { property: "og:description", content: "Reserve your venue at UTSAVAM in four simple steps." },
    ],
  }),
  component: BookPage,
});

const venues = [
  { id: "mahasthana", name: "Mahasthana Hall", cap: "Up to 1,000" },
  { id: "lotus", name: "Lotus Mandapam", cap: "Up to 400" },
  { id: "aranya", name: "Aranya Garden", cap: "Up to 250" },
];

const eventTypes = ["Wedding", "Reception", "Engagement", "Muhurtham", "Corporate", "Birthday", "Cultural"];
const addOnsList = ["Catering (Sadhya)", "Floral decor", "Photography", "Videography", "Live music", "DJ", "Accommodation"];

const schema = z.object({
  date: z.date({ required_error: "Pick a date" }),
  guests: z.coerce.number().min(20).max(1500),
  venue: z.string().min(1),
  eventType: z.string().min(1),
  addOns: z.array(z.string()),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().max(120),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

const steps = ["Date", "Venue", "Details", "Confirm"];

function BookPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<FormData>>({ addOns: [], guests: 150 });
  const [bookingId, setBookingId] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const update = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }));

  const submit = () => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Please complete all fields");
      return;
    }
    const id = "UTS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    try {
      const existing = JSON.parse(localStorage.getItem("utsavam_bookings") || "[]");
      existing.push({ id, ...parsed.data, createdAt: new Date().toISOString() });
      localStorage.setItem("utsavam_bookings", JSON.stringify(existing));
    } catch {}
    setBookingId(id);
  };

  if (bookingId) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/15 text-gold mb-8">
          <Check size={32} strokeWidth={1.4} />
        </div>
        <h1 className="font-display text-4xl">Your enquiry is in.</h1>
        <p className="mt-4 text-muted-foreground">Our coordinator will reach out within 24 hours to confirm availability.</p>
        <div className="mt-10 border border-border p-8 text-left bg-secondary/40 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-taupe">Booking ID</span><span className="font-mono">{bookingId}</span></div>
          <div className="flex justify-between"><span className="text-taupe">Date</span><span>{data.date && format(data.date, "PPP")}</span></div>
          <div className="flex justify-between"><span className="text-taupe">Venue</span><span>{venues.find((v) => v.id === data.venue)?.name}</span></div>
          <div className="flex justify-between"><span className="text-taupe">Guests</span><span>{data.guests}</span></div>
          <div className="flex justify-between"><span className="text-taupe">Event</span><span>{data.eventType}</span></div>
        </div>
        <Button asChild className="mt-10 rounded-none bg-foreground text-background hover:bg-foreground/90 px-8">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Booking</div>
      <h1 className="font-display text-4xl md:text-5xl">Reserve your date.</h1>

      {/* Stepper */}
      <ol className="mt-12 flex items-center justify-between text-xs uppercase tracking-[0.2em]">
        {steps.map((s, i) => (
          <li key={s} className="flex-1 flex items-center gap-3">
            <span className={cn(
              "w-7 h-7 inline-flex items-center justify-center border text-[11px]",
              i < step && "border-gold bg-gold text-gold-foreground",
              i === step && "border-foreground bg-foreground text-background",
              i > step && "border-border text-muted-foreground"
            )}>{i + 1}</span>
            <span className={cn(i === step ? "text-foreground" : "text-muted-foreground", "hidden sm:inline")}>{s}</span>
            {i < steps.length - 1 && <span className="flex-1 h-px bg-border" />}
          </li>
        ))}
      </ol>

      <div className="mt-12 border border-border p-8 md:p-12 bg-background">
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl">When and how many?</h2>
            <div>
              <Label className="text-xs uppercase tracking-wider text-taupe">Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("mt-2 w-full justify-start rounded-none h-12 font-normal", !data.date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.date ? format(data.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data.date}
                    onSelect={(d) => update({ date: d })}
                    disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-taupe">Expected Guests</Label>
              <Input
                type="number"
                min={20}
                max={1500}
                value={data.guests ?? ""}
                onChange={(e) => update({ guests: Number(e.target.value) })}
                className="mt-2 rounded-none h-12"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl">Choose your venue.</h2>
            <div className="grid gap-4">
              {venues.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => update({ venue: v.id })}
                  className={cn(
                    "text-left p-6 border transition-colors",
                    data.venue === v.id ? "border-foreground bg-secondary/60" : "border-border hover:border-gold"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-display text-xl">{v.name}</div>
                      <div className="text-xs uppercase tracking-wider text-taupe mt-1">{v.cap} guests</div>
                    </div>
                    {data.venue === v.id && <Check className="text-gold" size={20} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl">Event details.</h2>
            <div>
              <Label className="text-xs uppercase tracking-wider text-taupe">Event Type</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {eventTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update({ eventType: t })}
                    className={cn(
                      "px-4 py-2 text-sm border transition-colors",
                      data.eventType === t ? "border-foreground bg-foreground text-background" : "border-border hover:border-gold"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-taupe">Add-ons</Label>
              <div className="mt-2 grid sm:grid-cols-2 gap-2">
                {addOnsList.map((a) => {
                  const on = data.addOns?.includes(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => {
                        const cur = new Set(data.addOns ?? []);
                        on ? cur.delete(a) : cur.add(a);
                        update({ addOns: [...cur] });
                      }}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 text-sm border text-left transition-colors",
                        on ? "border-foreground bg-secondary/60" : "border-border hover:border-gold"
                      )}
                    >
                      <span className={cn("w-4 h-4 border inline-flex items-center justify-center", on ? "border-gold bg-gold text-gold-foreground" : "border-border")}>
                        {on && <Check size={12} />}
                      </span>
                      {a}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl">Your details.</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs uppercase tracking-wider text-taupe">Name</Label>
                <Input className="mt-2 rounded-none h-12" maxLength={80} value={data.name ?? ""} onChange={(e) => update({ name: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-wider text-taupe">Phone</Label>
                <Input className="mt-2 rounded-none h-12" maxLength={20} value={data.phone ?? ""} onChange={(e) => update({ phone: e.target.value })} />
              </div>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-taupe">Email</Label>
              <Input type="email" className="mt-2 rounded-none h-12" maxLength={120} value={data.email ?? ""} onChange={(e) => update({ email: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-taupe">Notes (optional)</Label>
              <Textarea className="mt-2 rounded-none" rows={4} maxLength={500} value={data.notes ?? ""} onChange={(e) => update({ notes: e.target.value })} />
            </div>
            <div className="bg-secondary/50 p-5 text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-taupe">Date</span><span>{data.date && format(data.date, "PPP")}</span></div>
              <div className="flex justify-between"><span className="text-taupe">Venue</span><span>{venues.find((v) => v.id === data.venue)?.name || "—"}</span></div>
              <div className="flex justify-between"><span className="text-taupe">Guests</span><span>{data.guests}</span></div>
              <div className="flex justify-between"><span className="text-taupe">Event</span><span>{data.eventType || "—"}</span></div>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-between gap-3">
          <Button
            variant="outline"
            onClick={back}
            disabled={step === 0}
            className="rounded-none"
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </Button>
          {step < steps.length - 1 ? (
            <Button
              onClick={() => {
                if (step === 0 && (!data.date || !data.guests)) return toast.error("Pick a date and guest count");
                if (step === 1 && !data.venue) return toast.error("Select a venue");
                if (step === 2 && !data.eventType) return toast.error("Select an event type");
                next();
              }}
              className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-6"
            >
              Continue <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={submit}
              className="rounded-none bg-gold text-gold-foreground hover:bg-gold/90 px-8"
            >
              Confirm Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
