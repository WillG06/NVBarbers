import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { RevealSection, Reveal } from "@/components/site/Section";
import tonic from "@/assets/bg/tonic.jpg";
import wall from "@/assets/bg/wall.jpg";
import chair from "@/assets/bg/chair.jpg";

export const Route = createFileRoute("/restoration")({
  component: RestorationPage,
  head: () => ({
    meta: [
      { title: "Hair Restoration — Discreet Hair Systems | NV Barbers Nottingham" },
      { name: "description", content: "Non-surgical hair systems and restoration in a private room at NV Barbers, Nottingham. Honest consultations, lasting results." },
      { property: "og:title", content: "Hair Restoration — NV Barbers" },
      { property: "og:description", content: "Non-surgical hair systems, fitted and maintained in private. Nottingham." },
    ],
    links: [{ rel: "canonical", href: "/restoration" }],
  }),
});

const stages = [
  { n: "01", t: "Consultation", d: "A private, no-obligation conversation. We assess thinning patterns, lifestyle, and what you actually want to look like." },
  { n: "02", t: "Fitting", d: "Each system is matched to your hair colour, density, and growth direction. Bonded or clipped — your choice, our recommendation." },
  { n: "03", t: "Cut & Blend", d: "We cut the system and your existing hair as one. Done well, no one — including you — will see the seam." },
  { n: "04", t: "Maintenance", d: "Refits every four to six weeks. We handle removal, cleaning, and re-bonding in the same private room." },
];

const whyItems = [
  { t: "No Surgery. No Recovery.", d: "Every result on this page was achieved without a scalpel, without downtime, and without a waiting list. Non-surgical systems deliver the same visual outcome — the same morning you walk in." },
  { t: "A Perfect Colour Match.", d: "We source systems in over 40 base colours with custom blending. Grey blends, highlights, natural variation — your system will match where you are, not where you were." },
  { t: "It Moves Like Real Hair.", d: "Modern hair systems use ultra-thin lace or skin bases and single-strand knotting. They flex with your scalp, survive swimming, sport, and intimacy — without shifting." },
  { t: "Nobody Knows.", d: "The hairline is the tell. We hand-customise every front edge and blend against your own growth. Clients report partners and colleagues who've never noticed — after years." },
];

const faqs = [
  { q: "Will it look natural?", a: "In the hands of an experienced technician, yes. The hairline is the most important element — we spend more time on that single inch than on anything else. Modern lace bases are invisible at normal social distance." },
  { q: "Can I still swim and exercise?", a: "Yes. Bonded systems use medical-grade adhesive that holds through sweat, rain, and swimming. We'll advise you on a maintenance schedule that keeps performance consistent." },
  { q: "What if I want to stop?", a: "You can. Removal is straightforward and leaves your natural hair exactly as it was. There's no long-term commitment. Most clients choose to continue — but that's always their decision." },
  { q: "How often do I need to come back?", a: "Refits every four to six weeks, depending on how quickly your natural hair grows and the bond type chosen. Each refit takes around an hour and includes full cleaning and re-bonding." },
  { q: "Does it damage my existing hair?", a: "No. The adhesives and tapes we use are designed specifically for scalp application and don't penetrate the follicle. Many clients see no change in their natural hair growth." },
  { q: "What does the first appointment involve?", a: "It's a conversation — nothing more. We look at your thinning pattern, talk through what you want, and show you real examples. There's no charge and no obligation. You leave with complete information to make your own decision." },
];

/* ─── Stack wrapper ─────────────────────────────────────────────────
   The outer div is sized to the content height so the page scrolls
   through every word. The inner section is sticky so the NEXT section
   slides over it once the outer div is fully scrolled past.
─────────────────────────────────────────────────────────────────── */
function Stack({ children, zIndex }: { children: React.ReactNode; zIndex: number }) {
  return (
    <div className="relative" style={{ zIndex }}>
      {children}
    </div>
  );
}

/* ─── Accordion ─────────────────────────────────────────────────── */
function Accordion({ q, a, dark = false }: { q: string; a: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const border = dark ? "border-background/10" : "border-foreground/10";
  const heading = dark ? "text-background" : "text-foreground";
  const icon = dark ? "text-background/35" : "text-foreground/35";
  const body = dark ? "text-background/60" : "text-foreground/60";
  return (
    <div className={`border-t ${border} cursor-pointer`} onClick={() => setOpen(!open)}>
      <div className="flex items-start justify-between gap-8 py-7">
        <h3 className={`font-display text-2xl md:text-3xl leading-snug ${heading}`}>{q}</h3>
        <span
          className={`flex-shrink-0 mt-1 text-xl ${icon} transition-transform duration-500`}
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >+</span>
      </div>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className={`pb-8 ${body} leading-relaxed max-w-2xl`}>{a}</p>
      </div>
    </div>
  );
}

/* ─── Before / After gallery ─────────────────────────────────────── */
function BeforeAfterGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? scrollRef.current.clientWidth * 0.75 : -(scrollRef.current.clientWidth * 0.75),
      behavior: "smooth",
    });
  };

  const cases = [
    { label: "Case 01", note: "Crown thinning — lace base, medium density" },
    { label: "Case 02", note: "Receding hairline — skin base, natural colour" },
    { label: "Case 03", note: "Diffuse thinning — full cap system, blended grey" },
    { label: "Case 04", note: "Temple recession — partial system, dark brown" },
  ];

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cases.map((c, i) => (
          <div key={i} className="flex-shrink-0 flex gap-4 md:gap-6">
            <div className="flex flex-col gap-3">
              <div
                className="w-[42vw] md:w-[28vw] lg:w-[22vw] aspect-[3/4] border border-foreground/10 flex items-end p-5"
                style={{ background: "linear-gradient(160deg, hsl(30 8% 18%) 0%, hsl(30 6% 12%) 100%)" }}
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/30">Before</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.label} / Before</p>
            </div>
            <div className="flex flex-col gap-3">
              <div
                className="w-[42vw] md:w-[28vw] lg:w-[22vw] aspect-[3/4] border border-foreground/10 flex items-end p-5"
                style={{ background: "linear-gradient(160deg, hsl(30 10% 22%) 0%, hsl(30 8% 15%) 100%)" }}
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--leather)]">After</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.label} / After</p>
            </div>
            {i < cases.length - 1 && (
              <div className="w-px bg-foreground/8 self-stretch mx-2 flex-shrink-0" />
            )}
          </div>
        ))}
        <div className="flex-shrink-0 w-8 md:w-16" />
      </div>
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 hover:border-foreground hover:text-foreground transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Scroll left"
        >←</button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 hover:border-foreground hover:text-foreground transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Scroll right"
        >→</button>
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground ml-2">Drag or use arrows</span>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
function RestorationPage() {
  return (
    <SiteLayout>

      {/* ── 1. HERO — light z-10 ───────────────────────────────────────
          Outer div is naturally sized to content so you scroll through it.
          When fully scrolled, section 2 (z-20) slides over the top.
      ─────────────────────────────────────────────────────────────── */}
      <Stack zIndex={10}>
        <section className="relative pt-40 md:pt-52 pb-32 bg-background overflow-hidden">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— Restoration / In private</p>
              <h1 className="mt-6  font-display text-[14vw] md:text-[9vw] leading-[0.88]">
                Hair<span className="italic" style={{ color: "var(--leather)" }}><br></br>Replacements</span>
              </h1>
            </div>
            <div className="col-span-12 md:col-span-5">
              <p className="text-lg leading-relaxed text-foreground/75 max-w-md">
                Non-surgical hair systems, fitted in a private room behind the shop. No surgery, no scarring — just a careful match, expertly cut, and maintained for as long as you want it.
              </p>
              <Link
                to="/book"
                className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[12px] uppercase tracking-[0.22em] hover:gap-4 transition-all"
              >
                Book a private consultation →
              </Link>
            </div>
          </div>
        </section>
      </Stack>

      {/* ── 2. IMAGE BREAK — dark z-20 ───────────────────────────────── */}
      <Stack zIndex={20}>
        <div className="relative h-[70vh] md:h-screen overflow-hidden">
          <img src={chair} alt="A private barber chair in low light" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 flex items-end p-8 md:p-20 bg-gradient-to-t from-black/70 via-transparent to-transparent">
            <p className="font-display italic text-white/90 text-3xl md:text-6xl max-w-3xl leading-tight">
              "The hairline is the tell. We spend more time on that single inch than anything else."
            </p>
          </div>
        </div>
      </Stack>

      {/* ── 3. WHAT IS A SYSTEM — light z-30 ─────────────────────────── */}
      <Stack zIndex={30}>
        <RevealSection className="bg-background py-32 md:py-44">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="col-span-12 md:col-span-4 md:sticky md:top-24">
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— What it is</p>
              <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[0.92]">
                Not a wig.<br /><span className="italic">Not a transplant.</span><br />Something better.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8 space-y-8">
              <p className="text-xl md:text-2xl leading-relaxed text-foreground/80">
                A hair system is a bespoke, skin-conforming unit made from real human hair — individually knotted strand by strand into a breathable lace or ultra-thin polyurethane base. It doesn't sit on top of your head. It bonds to your scalp.
              </p>
              <p className="text-lg leading-relaxed text-foreground/65">
                The difference between a modern hair system and the toupees of a previous generation is the difference between a bespoke suit and a novelty costume. The materials are fundamentally different. The craft is categorically more demanding. The results are, in the right hands, undetectable.
              </p>
              <p className="text-lg leading-relaxed text-foreground/65">
                At NV Barbers we don't just fit systems — we cut them in. The moment you sit in the chair, your system becomes part of your hair, styled and shaped as a single piece alongside whatever you're still growing.
              </p>
              <div className="pt-8 border-t border-foreground/10">
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-8">The right solution for</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    ["Pattern baldness", "Androgenetic alopecia — the most common form. Systems cover crown, temples, or the full scalp."],
                    ["Post-chemotherapy", "When regrowth is patchy or slow, a system provides immediate coverage throughout recovery."],
                    ["Alopecia areata", "Unpredictable spot or full scalp loss — a system provides complete coverage regardless of how the condition progresses."],
                  ].map(([title, body]) => (
                    <div key={title as string} className="border-l-2 border-[var(--leather)] pl-4">
                      <p className="font-display text-lg">{title}</p>
                      <p className="mt-2 text-[13px] text-foreground/55 leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </Stack>

      {/* ── 4. WHY IT WORKS — dark z-40 ──────────────────────────────── */}
      <Stack zIndex={40}>
        <section className="bg-foreground text-background py-32 md:py-44">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <p className="text-[11px] uppercase tracking-[0.28em] text-background/40">— Why it works</p>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
              Four things people<br /><span className="italic text-[var(--leather)]">always ask first.</span>
            </h2>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
              {whyItems.map((item) => (
                <div key={item.t} className="border-t border-background/15 pt-6">
                  <h3 className="mt-3 font-display text-3xl md:text-4xl">{item.t}</h3>
                  <p className="mt-4 text-background/65 leading-relaxed max-w-md">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Stack>

      {/* ── 5. BEFORE & AFTER — light z-50 ───────────────────────────── */}
      <Stack zIndex={50}>
        <section className="bg-background py-32 md:py-44">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 mb-12">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— Results</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
                Before<br /><span className="italic">& after.</span>
              </h2>
              <p className="text-foreground/60 max-w-sm leading-relaxed text-sm md:text-base">
                Four real cases — crown thinning to full recession — photographed in the same light, same position, same day as the fitting.
              </p>
            </div>
          </div>
          <div className="pl-6 md:pl-12">
            <BeforeAfterGallery />
          </div>
        </section>
      </Stack>

      {/* ── 6. PROCESS — dark z-60 ───────────────────────────────────── */}
      <Stack zIndex={60}>
        <section className="bg-foreground text-background py-32 md:py-44">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <p className="text-[11px] uppercase tracking-[0.28em] text-background/40">— The process</p>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
              Honest at every<br /><span className="italic text-[var(--leather)]">stage.</span>
            </h2>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
              {stages.map((s) => (
                <div key={s.n} className="border-t border-background/15 pt-6">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--leather)]">{s.n}</span>
                  <h3 className="mt-3 font-display text-4xl">{s.t}</h3>
                  <p className="mt-4 text-background/65 leading-relaxed max-w-md">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Stack>

      {/* ── 7. TIMELINE — light z-70 ─────────────────────────────────── */}
      <Stack zIndex={70}>
        <RevealSection className="bg-background py-32 md:py-44">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— Your first month</p>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
              Day one to<br /><span className="italic">day thirty.</span>
            </h2>
            <div className="mt-20 relative">
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-foreground/10" />
              {[
                { day: "Day 1",    title: "Consultation",    body: "You walk in. We talk — about what you want, what's realistic, and what the options are. No pressure, no charge." },
                { day: "Week 1",   title: "System sourced",  body: "We order your system, matched precisely to your colour, density, and base type. This takes 3–7 days." },
                { day: "Week 2",   title: "Fitting day",     body: "You return for your first fit. We bond, cut, and style everything together. You leave looking exactly like yourself — with more hair." },
                { day: "Week 6",   title: "First refit",     body: "Your bond has cycled once. We remove the system, clean it, inspect the hairline, and re-bond. Takes about an hour." },
                { day: "Ongoing",  title: "Your new routine",body: "Every four to six weeks — same private room, same technician, same standard. Most clients plan it like a haircut." },
              ].map((item, i) => (
                <div key={i} className="relative pl-14 md:pl-20 pb-14 last:pb-0">
                  <div className="absolute left-[11px] md:left-[19px] top-1.5 w-3 h-3 rounded-full bg-[var(--leather)] border-2 border-background" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{item.day}</span>
                  <h3 className="mt-2 font-display text-3xl md:text-4xl">{item.title}</h3>
                  <p className="mt-3 text-foreground/60 leading-relaxed max-w-lg">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </Stack>

      {/* ── 8. PRICING sticky split — dark z-80 ──────────────────────── */}
      <Stack zIndex={80}>
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-2">
            <div className="md:sticky md:top-0 md:h-screen">
              <img src={tonic} alt="House restoration tonic" className="h-[60vh] md:h-full w-full object-cover opacity-90" loading="lazy" />
            </div>
            <div className="px-6 md:px-16 py-24 md:py-44 space-y-32">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-background/50">— Pricing</p>
                <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95]">
                  Plain numbers,<br /><span className="italic text-[var(--leather)]">no upsell.</span>
                </h2>
              </div>
              <ul className="divide-y divide-background/10 border-y border-background/10">
                {[
                  ["Consultation",       "Free",     "60 min"],
                  ["Initial fitting & cut", "From £450", "180 min"],
                  ["Refit & maintenance","From £75",  "60 min"],
                  ["System replacement", "From £320", "120 min"],
                ].map(([n, p, d]) => (
                  <li key={n} className="grid grid-cols-12 gap-4 py-7">
                    <span className="col-span-7 font-display text-2xl md:text-3xl">{n}</span>
                    <span className="hidden md:flex col-span-2 items-center text-[12px] uppercase tracking-[0.2em] text-background/50">{d}</span>
                    <span className="col-span-5 md:col-span-3 text-right font-display text-xl md:text-3xl">{p}</span>
                  </li>
                ))}
              </ul>
              <div>
                <h3 className="font-display text-3xl md:text-4xl">Discretion, by design.</h3>
                <p className="mt-4 text-background/70 leading-relaxed max-w-md">
                  The restoration room has its own entrance and its own diary. Walk in, walk out — no waiting room, no introductions, no questions you don't want to answer.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Stack>

      {/* ── 9. FAQ — light z-90 ──────────────────────────────────────── */}
      <Stack zIndex={90}>
        <RevealSection className="bg-background py-32 md:py-44">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4 md:sticky md:top-24">
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— Common questions</p>
              <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[0.92]">
                Things people<br /><span className="italic">need to know</span><br />before they ask.
              </h2>
              <p className="mt-6 text-foreground/55 leading-relaxed text-sm max-w-xs">
                These are the questions we hear most often. If yours isn't here, the consultation exists precisely for it.
              </p>
            </div>
            <div className="col-span-12 md:col-span-8">
              {faqs.map((item) => (
                <Accordion key={item.q} q={item.q} a={item.a} dark={false} />
              ))}
              <div className="border-t border-foreground/10" />
            </div>
          </div>
        </RevealSection>
      </Stack>

      {/* ── 10. CTA — dark z-100 ─────────────────────────────────────── */}
      <Stack zIndex={100}>
        <section className="bg-foreground text-background py-32 md:py-44">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-background/40">— Begin</p>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9]">
              Talk to us<br /><span className="italic text-[var(--leather)]">first.</span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-background/65 leading-relaxed">
              Every consultation is free, in person, and entirely without pressure. If we're not the right answer, we'll say so.
            </p>
            <Link
              to="/book"
              className="mt-10 inline-flex items-center gap-2 border border-background/30 px-8 py-4 text-[12px] uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-colors"
            >
              Reserve a private hour →
            </Link>
          </div>
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 mt-20">
            <img src={wall} alt="Reclaimed wood, warm light" className="w-full h-[40vh] object-cover" loading="lazy" />
          </div>
        </section>
      </Stack>

    </SiteLayout>
  );
}