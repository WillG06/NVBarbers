import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/Layout";
import { allItems } from "@/lib/menu";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({ items: z.string().optional() });

export const Route = createFileRoute("/book")({
  component: BookPage,
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Reserve — Book Your Chair | NV Barbers Nottingham" },
      { name: "description", content: "Reserve your chair at NV Barbers in Hockley, Nottingham. By appointment only." },
      { property: "og:title", content: "Reserve — NV Barbers" },
      { property: "og:description", content: "Book your chair at NV Barbers, Nottingham." },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
});

function BookPage() {
  const search = Route.useSearch();
  const preselected = useMemo(
    () => (search.items ? search.items.split(",").filter(Boolean) : []),
    [search.items],
  );
  const [selected, setSelected] = useState<string[]>(preselected);
  const [step, setStep] = useState<1 | 2 | 3>(preselected.length ? 2 : 1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [barber, setBarber] = useState("Any");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top whenever the step changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const total = useMemo(
    () => allItems.filter((i) => selected.includes(i.id)).reduce((s, i) => s + i.price, 0),
    [selected],
  );
  const totalDur = useMemo(
    () => allItems.filter((i) => selected.includes(i.id)).reduce((s, i) => s + parseInt(i.duration), 0),
    [selected],
  );

  const toggle = (id: string) =>
    setSelected((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const goNext = (n: 1 | 2 | 3) => setStep(n);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { error: insertErr } = await supabase.from("bookings").insert({
        name,
        email,
        phone,
        notes: notes || null,
        services: selected,
        barber,
        date: date || null,
        time: time || null,
        total_price: total,
        total_duration: totalDur,
      });
      if (insertErr) throw insertErr;
      setConfirmed(true);
    } catch (err) {
      console.error(err);
      setError("We couldn't hold the chair just now. Please try again, or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <SiteLayout>
        <section className="min-h-screen flex items-center justify-center px-6 pt-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-xl text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— Reservation held</p>
            <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95]">Your chair<br /><span className="italic" style={{ color: "var(--leather)" }}>awaits.</span></h1>
            <p className="mt-6 text-foreground/70 leading-relaxed">
              We've logged your request and sent confirmation to <span className="text-foreground">{email}</span>. Reply to that message if you need to change anything — we'll see it.
            </p>
            <div className="mt-10 border-t border-foreground/10 pt-6 text-left text-sm space-y-1">
              <p><span className="text-muted-foreground uppercase tracking-[0.2em] text-[11px]">When · </span>{date || "—"} at {time || "—"}</p>
              <p><span className="text-muted-foreground uppercase tracking-[0.2em] text-[11px]">With · </span>{barber}</p>
              <p><span className="text-muted-foreground uppercase tracking-[0.2em] text-[11px]">Total · </span>£{total} · {totalDur} min</p>
            </div>
          </motion.div>
        </section>
      </SiteLayout>
    );
  }

  const steps = [
    { n: 1, label: "Services" },
    { n: 2, label: "Time" },
    { n: 3, label: "Details" },
  ];

  return (
    <SiteLayout>
      <section className="pt-36 md:pt-52 pb-10 md:pb-12 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— Reserve / By appointment</p>
          <h1 className="mt-6 font-display text-[14vw] md:text-[7vw] leading-[0.9]">
            Hold the<br /><span className="italic" style={{ color: "var(--leather)" }}>chair.</span>
          </h1>
        </div>
      </section>

      <div className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-12">
          {/* Stepper */}
          <aside className="col-span-12 md:col-span-3">
            <ol className="md:sticky md:top-32 flex md:flex-col gap-6 md:gap-6 overflow-x-auto md:overflow-visible">
              {steps.map((s) => (
                <li key={s.n}>
                  <button onClick={() => goNext(s.n as 1 | 2 | 3)} className="text-left flex items-baseline gap-3 md:gap-4 whitespace-nowrap">
                    <span className={`font-display text-2xl md:text-3xl ${step === s.n ? "text-foreground" : "text-foreground/30"}`}>0{s.n}</span>
                    <span className={`text-[11px] md:text-[12px] uppercase tracking-[0.22em] ${step === s.n ? "text-foreground" : "text-foreground/40"}`}>{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>

            {selected.length > 0 && (
              <div className="mt-10 md:mt-12 border-t border-foreground/10 pt-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Your chair</p>
                <p className="mt-3 font-display text-3xl">£{total}</p>
                <p className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground">≈ {totalDur} min · {selected.length} services</p>
              </div>
            )}
          </aside>

          {/* Step content */}
          <div className="col-span-12 md:col-span-9">
            {step === 1 && (
              <div>
                <h2 className="font-display text-3xl md:text-5xl mb-6 md:mb-8">What are we doing today?</h2>
                <div className="border-t border-foreground/10">
                  {allItems.map((it) => {
                    const on = selected.includes(it.id);
                    return (
                      <button
                        key={it.id}
                        onClick={() => toggle(it.id)}
                        className={`w-full text-left grid grid-cols-12 gap-3 py-5 md:py-6 border-b border-foreground/10 transition-colors ${on ? "bg-[color-mix(in_oklab,var(--leather)_18%,transparent)]" : "hover:bg-foreground/[0.03]"}`}
                      >
                        <span className="col-span-1 pt-1 text-xl" style={{ color: "var(--leather)" }}>{on ? "✓" : "+"}</span>
                        <span className="col-span-7 md:col-span-7 font-display text-xl md:text-3xl">{it.name}</span>
                        <span className="hidden md:block col-span-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground pt-2">{it.duration}</span>
                        <span className="col-span-4 md:col-span-2 text-right font-display text-xl md:text-2xl">£{it.price}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-8 md:mt-10 flex justify-end">
                  <button
                    disabled={!selected.length}
                    onClick={() => goNext(2)}
                    className="border border-foreground px-5 md:px-6 py-3 text-[12px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-40"
                  >
                    Continue → time
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-3xl md:text-5xl mb-6 md:mb-8">When suits?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Date</span>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full border-b border-foreground/30 bg-transparent py-3 font-display text-xl md:text-2xl focus:outline-none focus:border-foreground" />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Time</span>
                    <select value={time} onChange={(e) => setTime(e.target.value)} className="mt-2 w-full border-b border-foreground/30 bg-transparent py-3 font-display text-xl md:text-2xl focus:outline-none focus:border-foreground appearance-none">
                      <option value="">Select…</option>
                      {["09:00","10:00","11:00","12:00","13:30","14:30","15:30","16:30","17:30"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">With</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Any", "Nathan", "Vee", "Marcus"].map((b) => (
                        <button key={b} type="button" onClick={() => setBarber(b)} className={`px-4 py-2 text-[12px] uppercase tracking-[0.2em] border transition-colors ${barber === b ? "bg-foreground text-background border-foreground" : "border-foreground/20 hover:border-foreground/60"}`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </label>
                </div>
                <div className="mt-8 md:mt-10 flex justify-between">
                  <button onClick={() => goNext(1)} className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">← Back</button>
                  <button disabled={!date || !time} onClick={() => goNext(3)} className="border border-foreground px-5 md:px-6 py-3 text-[12px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-40">
                    Continue → details
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={submit}>
                <h2 className="font-display text-3xl md:text-5xl mb-6 md:mb-8">Just the basics.</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Name</span>
                    <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full border-b border-foreground/30 bg-transparent py-3 font-display text-xl md:text-2xl focus:outline-none focus:border-foreground" />
                  </label>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Email</span>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border-b border-foreground/30 bg-transparent py-3 font-display text-xl md:text-2xl focus:outline-none focus:border-foreground" />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Phone</span>
                    <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full border-b border-foreground/30 bg-transparent py-3 font-display text-xl md:text-2xl focus:outline-none focus:border-foreground" />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Anything we should know?</span>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-2 w-full border-b border-foreground/30 bg-transparent py-3 text-base md:text-lg focus:outline-none focus:border-foreground resize-none" />
                  </label>
                </div>
                {error && <p className="mt-6 text-sm text-destructive">{error}</p>}
                <div className="mt-8 md:mt-10 flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4">
                  <button type="button" onClick={() => goNext(2)} className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground self-start">← Back</button>
                  <button type="submit" disabled={submitting} className="bg-foreground text-background px-7 md:px-8 py-3.5 md:py-4 text-[12px] uppercase tracking-[0.22em] hover:bg-[var(--leather)] transition-colors disabled:opacity-60">
                    {submitting ? "Holding…" : `Hold the chair · £${total}`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
