import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { RevealSection, Reveal } from "@/components/site/Section";
import hero from "@/assets/bg/hero.jpg";
import hero2 from "@/assets/bg/hero2.jpg";
import hero3 from "@/assets/bg/hero3.jpg";
import hero4 from "@/assets/bg/hero4.jpg";
import chair from "@/assets/bg/chair.jpg";
import tools from "@/assets/bg/tools.jpg";
import tonic from "@/assets/bg/tonic.jpg";
import wall from "@/assets/bg/wall.jpg";
import towels from "@/assets/bg/towels.jpg";
import abstractImg from "@/assets/bg/abstract.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NV Barbers — Modern Barbering House, Nottingham" },
      { name: "description", content: "Signature cuts, traditional hot shaves, and discreet hair restoration in Hockley, Nottingham. Reserve your chair." },
      { property: "og:title", content: "NV Barbers — Nottingham" },
      { property: "og:description", content: "Modern barbering, traditional craft. Hockley, Nottingham." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

/* ---------- HERO ---------- */
const heroSlides = [hero, hero2, hero3, hero4];

function Hero() {
  const [i, setI] = useState(0);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const yText = useTransform(scrollY, [0, 600], [0, 80]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-foreground text-background">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.6, ease: [0.22, 1, 0.36, 1] }, scale: { duration: 6, ease: "linear" } }}
          className="absolute inset-0"
        >
          <img src={heroSlides[i]} alt="" className="h-full w-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(180deg, rgba(8,14,14,0.55) 0%, rgba(8,14,14,0.15) 35%, rgba(8,14,14,0.88) 100%)" }} />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-12 pt-28 md:pt-32 flex justify-between text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-background/70">
        <span>Est. Nottingham</span>
        <span className="hidden md:inline">No. 001 / The Modern Barbering House</span>
        <span>NG1 1FF</span>
      </div>

      <motion.div style={{ y: yText, opacity }} className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-12 h-[calc(100%-9rem)] flex flex-col justify-end pb-20 md:pb-24">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-9">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-display text-[18vw] md:text-[10.5vw] leading-[0.88] tracking-tight"
            >
              
              NV<span className="italic" style={{ color: "var(--leather)" }}>Barbers</span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="col-span-12 md:col-span-3 md:pb-3"
          >
            <p className="text-sm leading-relaxed text-background/80 max-w-xs">
              A modern barbering house in Hockley. Disciplined craft, restrained design, a quiet confidence in the cut.
            </p>
            <Link
              to="/book"
              className="mt-6 inline-flex items-center gap-3 border-b border-background pb-1 text-[12px] uppercase tracking-[0.22em] hover:gap-5 transition-all"
            >
              Reserve a chair <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {heroSlides.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`Show slide ${k + 1}`}
            className="block h-px transition-all"
            style={{
              width: k === i ? 36 : 14,
              backgroundColor: k === i ? "var(--leather)" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- GALLERY STATEMENT ----------
 * Drop-in replacement for the GalleryStatement + GalleryCard components in index.tsx
 *
 * Changes from previous version:
 *  - Title fades out immediately on scroll so it never bleeds behind cards
 *  - Section height 650vh → slower scroll = smoother feel
 *  - Wider progress windows → cards rise/fall gradually, not zip
 *  - Card height capped at 72vh with py-16 padding on wrapper → never touches top/bottom edges
 */

/* ─────────────────────────────────────────────────────────────
   Drop-in replacement for GalleryStatement + GalleryCard
   in index.tsx.

   Changes:
   1. useSpring wraps raw scrollYProgress → buttery smooth follow
   2. Multi-keyframe arrays simulate ease-in / ease-out curves
      (Framer's useTransform is linear between stops, so we add
       intermediate stops to fake a bezier)
   3. z-index fixed: title z-10, cards z-20 (cards cover title)
   4. Title gone by 4% scroll → never bleeds behind a card
   5. Section 500vh → more breathing room between cards
   6. Mobile card width 88vw instead of 58vw
   7. Padding py-8 on mobile so card isn't crushed by nav

   Add `useSpring` to your framer-motion import:
   import { AnimatePresence, motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
─────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────
   Paste these two functions into index.tsx, replacing the
   existing GalleryStatement and GalleryCard.
───────────────────────────────────────────────────────────── */

function GalleryStatement() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.0005,
  });

  // Title gone by 4% — well before card 1 arrives at 5%
  const titleOpacity = useTransform(scrollYProgress, [0, 0.02, 0.04], [1, 0.25, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.04],        [0, -28]);

  /*
   * Card timing over 520vh:
   *   Card 1  enter 05–14%  hold 14–36%  exit 36–46%
   *   Card 2  enter 44–53%  hold 53–69%  exit 69–79%
   *   Card 3  enter 77–86%  hold 86–92%  exit 92–100%  ← exits at the end
   *
   * Each entry/exit uses intermediate stops to fake ease-in / ease-out.
   * Card 3 now exits before the section ends so the user isn't left
   * sitting on a static screen with scroll momentum built up — the exit
   * itself signals "done, move on" before they reach the boundary.
   */
  const card1Y = useTransform(
    scrollYProgress,
    [0.05, 0.08, 0.11, 0.14,   0.36, 0.39, 0.43, 0.46],
    ["105%","65%","22%","0%",  "0%","-18%","-65%","-105%"],
  );
  const card2Y = useTransform(
    scrollYProgress,
    [0.44, 0.47, 0.50, 0.53,   0.69, 0.72, 0.76, 0.79],
    ["105%","65%","22%","0%",  "0%","-18%","-65%","-105%"],
  );
  // Card 3 entry + holds + gentle exit before section end
  const card3Y = useTransform(
    scrollYProgress,
    [0.77, 0.80, 0.83, 0.86,   0.92, 0.95, 0.98, 1.00],
    ["105%","65%","22%","0%",  "0%","-14%","-55%","-105%"],
  );
  // Card 3 also fades during its exit so it feels deliberate, not abrupt
  const card3Opacity = useTransform(
    scrollYProgress,
    [0.86, 0.92, 0.98],
    [1,    1,    0],
  );

  const bgOpacity = useTransform(scrollYProgress, [0.44, 0.70], [1, 0]);
  const bgScale   = useTransform(scrollYProgress, [0, 1],       [1.02, 1.07]);

  return (
    /*
     * overscrollBehavior: "contain" — tells iOS not to let momentum scroll
     * bleed past the boundary of this element into the next section.
     * This prevents the "zoom past MenuPreview" problem on iPhone.
     */
    <section
      ref={ref}
      className="relative"
      style={{ height: "520vh", overscrollBehavior: "contain" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-foreground">

        {/* Pinned background */}
        <motion.div style={{ opacity: bgOpacity, scale: bgScale }} className="absolute inset-0">
          <img src={chair} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,14,14,0.45) 0%, rgba(8,14,14,0.82) 100%)" }} />
        </motion.div>

        {/* Title — z-10, behind cards (z-20) */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-10 flex items-center pointer-events-none"
        >
          <div className="mx-auto max-w-[1600px] w-full px-6 md:px-12 grid grid-cols-12 gap-6 text-background">
            <div className="col-span-12 md:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.28em] text-background/60">— No. 02 / Portfolio</p>
              <h2 className="mt-6 font-display text-6xl md:text-[8.5vw] leading-[0.92]">
                A quiet<br />
                <span className="italic" style={{ color: "var(--leather)" }}>archive</span> of work.
              </h2>
              <p className="mt-6 max-w-md text-background/75 leading-relaxed">
                Cuts photographed in the chair, lit by the same window every time. No filters, no flattery — only the work. Scroll.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cards — z-20 */}
        <GalleryCard y={card1Y} src={tools} caption="Tools, end of day."               index="01" />
        <GalleryCard y={card2Y} src={wall}  caption="The mirror at four o'clock."      index="02" />

        {/* Card 3 gets its own wrapper so we can fade it during exit */}
        <motion.div style={{ opacity: card3Opacity }} className="absolute inset-0 z-20">
          <GalleryCard y={card3Y} src={tonic} caption="House tonic, slow morning light." index="03" cta />
        </motion.div>
      </div>
    </section>
  );
}

function GalleryCard({
  y, src, caption, index, cta,
}: {
  y: MotionValue<string>;
  src: string;
  caption: string;
  index: string;
  cta?: boolean;
}) {
  return (
    <motion.div
      style={{ y }}
      /*
       * z-20 on cards 1 & 2.
       * Card 3 inherits z-20 from its parent opacity wrapper.
       * py-8 md:py-14 keeps cards clear of nav and bottom edge.
       */
      className="absolute inset-0 z-20 flex items-center justify-center py-8 md:py-14 will-change-transform"
    >
      <div
        className="relative overflow-hidden"
        style={{
          width:     "clamp(300px, 88vw, 820px)",
          height:    "clamp(320px, 70vh, 840px)",
          boxShadow: "0 60px 120px rgba(0,0,0,0.65), 0 10px 30px rgba(0,0,0,0.30)",
        }}
      >
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,14,14,0.92) 100%)" }} />
        <p className="absolute top-6 left-7 text-[11px] uppercase tracking-[0.30em] text-background/40">{index}</p>
        <div className="absolute bottom-0 left-0 right-0 p-7 md:p-12 text-background">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-background/50">— {index} / Archive</p>
          <h3 className="mt-2 font-display text-3xl md:text-5xl leading-[0.95]">{caption}</h3>
          {cta && (
            <Link
              to="/gallery"
              className="mt-6 inline-flex items-center gap-3 border border-background/60 px-6 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-background hover:text-foreground transition-colors"
            >
              Enter the gallery →
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}



/* ---------- MENU PREVIEW ---------- */
function MenuPreview() {
  const previews = [
    { name: "The NV Signature", price: 38, dur: "55 min" },
    { name: "Skin Fade", price: 30, dur: "45 min" },
    { name: "Traditional Hot Shave", price: 32, dur: "45 min" },
    { name: "Long-Hair Restyle", price: 42, dur: "60 min" },
  ];
  return (
    <RevealSection className="relative bg-foreground text-background py-28 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-12 md:mb-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-background/50">— No. 03 / The Cuts</p>
            <h2 className="mt-6 font-display text-5xl md:text-8xl leading-[0.95]">
              An interactive<br /><span className="italic" style={{ color: "var(--leather)" }}>order</span> form.
            </h2>
          </div>
          <Link to="/services" className="inline-flex w-fit items-center gap-2 border-b border-background pb-1 text-[12px] uppercase tracking-[0.22em] hover:gap-4 transition-all">
            See the full list →
          </Link>
        </div>

        <ul className="divide-y divide-background/10 border-y border-background/10">
          {previews.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="grid grid-cols-12 gap-3 py-6 md:py-7 group"
            >
              <span className="col-span-1 hidden md:block text-[11px] uppercase tracking-[0.2em] text-background/40 pt-3">{String(i + 1).padStart(2, "0")}</span>
              <span className="col-span-8 md:col-span-7 font-display text-2xl md:text-5xl">{p.name}</span>
              <span className="col-span-12 md:col-span-2 hidden md:flex items-center text-[12px] uppercase tracking-[0.2em] text-background/50">{p.dur}</span>
              <span className="col-span-4 md:col-span-2 text-right font-display text-xl md:text-4xl">£{p.price}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </RevealSection>
  );
}

/* ---------- SIGNATURE SPOTLIGHT ---------- */
function Spotlight() {
  return (
    <RevealSection className="relative bg-background py-28 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-12 items-center">
        <Reveal className="col-span-12 md:col-span-5 relative">
          <div className="aspect-[3/4] overflow-hidden">
            <img src={tonic} alt="House restoration tonic on aged wood" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <span className="absolute -top-4 -left-4 bg-foreground text-background px-3 py-1.5 text-[10px] uppercase tracking-[0.25em]">House Special</span>
        </Reveal>
        <div className="col-span-12 md:col-span-7 md:pl-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— Signature spotlight</p>
          <h2 className="mt-6 font-display text-5xl md:text-8xl leading-[0.92]">
            The NV<br /><span className="italic" style={{ color: "var(--leather)" }}>Signature</span>.
          </h2>
          <p className="mt-8 text-base md:text-lg leading-relaxed text-foreground/75 max-w-xl">
            Fifty-five minutes that begin with a conversation and end with a hot towel. Consultation, a full restyle in the chair, and a finish you can feel under your hands. It is, simply, what we do best.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6 md:gap-8">
            <span className="font-display text-4xl md:text-5xl">£38</span>
            <Link to="/book" className="border border-foreground px-5 md:px-6 py-3 text-[12px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors">
              Reserve the signature →
            </Link>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* ---------- STICKY ABOUT ---------- */
function StickyAbout() {
  return (
    <section className="relative bg-[color-mix(in_oklab,var(--cream)_94%,var(--ink)_4%)]">
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-2">
        <div className="md:sticky md:top-0 md:h-screen">
          <img src={wall} alt="Reclaimed wood wall and gilded mirror" className="h-[55vh] md:h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="px-6 md:px-16 py-20 md:py-44 space-y-28 md:space-y-44">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— No. 04 / Story</p>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95]">
              A house<br />built around<br /><span className="italic" style={{ color: "var(--leather)" }}>the chair.</span>
            </h2>
          </div>
          <div>
            <h3 className="font-display text-3xl md:text-4xl">Discipline.</h3>
            <p className="mt-4 text-foreground/70 leading-relaxed max-w-md">
              Every appointment opens the same way: the same window, the same lather, the same ten-minute consultation. Repetition is how craft holds its line.
            </p>
          </div>
          <div>
            <h3 className="font-display text-3xl md:text-4xl">Restraint.</h3>
            <p className="mt-4 text-foreground/70 leading-relaxed max-w-md">
              We turn down work we cannot do well. Two chairs, three barbers, one room — by design, never by accident.
            </p>
          </div>
          <div>
            <h3 className="font-display text-3xl md:text-4xl">Discretion.</h3>
            <p className="mt-4 text-foreground/70 leading-relaxed max-w-md">
              Our restoration room sits behind a separate door. What happens there stays between you and the mirror.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[12px] uppercase tracking-[0.22em] hover:gap-4 transition-all">
              Read the full story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- REVIEWS ---------- */
const reviews = [
  { quote: "Finally, a barber that takes the time. I've not been to anyone else in two years.", name: "Jordan M.", role: "Hockley" },
  { quote: "The hot shave is the most relaxing forty minutes of my month. Worth every penny.", name: "Olu A.", role: "West Bridgford" },
  { quote: "Quiet, considered, and genuinely good at what they do. The room itself is beautiful.", name: "Rohan K.", role: "Mapperley" },
  { quote: "The restoration consultation was honest in a way I wasn't expecting. No upsell, just options.", name: "David R.", role: "Beeston" },
];

function Reviews() {
  return (
    <RevealSection className="relative bg-background py-28 md:py-44 border-t border-foreground/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— No. 05 / In their words</p>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95]">
              The room,<br /><span className="italic" style={{ color: "var(--leather)" }}>overheard.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
            <span style={{ color: "var(--leather)" }}>★★★★★</span> 4.9 · Google
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-background p-8 md:p-14"
            >
              <span aria-hidden className="font-display text-6xl md:text-7xl leading-none" style={{ color: "var(--leather)" }}>"</span>
              <blockquote className="mt-2 font-display text-xl md:text-3xl leading-snug">{r.quote}</blockquote>
              <figcaption className="mt-6 text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
                {r.name} — {r.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

/* ---------- FAQ TEASER ---------- */
const faqs = [
  { q: "Do you take walk-ins?", a: "Occasionally, but appointments are guaranteed. We hold a chair only when it's earned." },
  { q: "What does the restoration service involve?", a: "A discreet consultation followed by non-surgical hair systems — fitted, blended, and maintained in private." },
  { q: "Where are you?", a: "14 Goose Gate, Hockley, Nottingham — three minutes from the lace market tram stop." },
];

function FaqTeaser() {
  return (
    <RevealSection className="relative bg-foreground text-background py-28 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-background/50">— No. 06 / Questions</p>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95]">
            Things<br />worth<br /><span className="italic" style={{ color: "var(--leather)" }}>asking.</span>
          </h2>
          <Link to="/faq" className="mt-8 inline-flex items-center gap-2 border-b border-background pb-1 text-[12px] uppercase tracking-[0.22em] hover:gap-4 transition-all">
            All answers →
          </Link>
        </div>
        <div className="col-span-12 md:col-span-8 divide-y divide-background/10 border-y border-background/10">
          {faqs.map((f, i) => (
            <motion.details
              key={f.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group py-7 md:py-8 cursor-pointer"
            >
              <summary className="flex justify-between items-baseline gap-6 list-none">
                <span className="font-display text-xl md:text-3xl">{f.q}</span>
                <span className="text-2xl group-open:rotate-45 transition-transform duration-500" style={{ color: "var(--leather)" }}>+</span>
              </summary>
              <p className="mt-4 max-w-2xl text-background/70 leading-relaxed">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCta() {
  return (
    <section className="relative h-[70vh] min-h-[480px] overflow-hidden bg-foreground text-background flex items-center justify-center text-center">
      <img src={abstractImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-foreground/50" />
      <div className="relative z-10 px-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-background/60">— By appointment</p>
        <h2 className="mt-6 font-display text-5xl md:text-9xl leading-[0.9]">
          Take the<br /><span className="italic" style={{ color: "var(--leather)" }}>chair.</span>
        </h2>
        <Link to="/book" className="mt-10 inline-flex items-center gap-3 border border-background px-7 md:px-8 py-3.5 md:py-4 text-[12px] uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-colors">
          Reserve now →
        </Link>
      </div>
    </section>
  );
}

/* ---------- PAGE ---------- */
function Index() {
  void towels;
  return (
    <SiteLayout>
      <Hero />
      <GalleryStatement />
      <MenuPreview />
      <Spotlight />
      <StickyAbout />
      <Reviews />
      <FaqTeaser />
      <FinalCta />
    </SiteLayout>
  );
}