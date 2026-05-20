import { createFileRoute, Link } from "@tanstack/react-router";
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

function RestorationPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-40 md:pt-52 pb-24 bg-background overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— Restoration / In private</p>
            <h1 className="mt-6 font-display text-[14vw] md:text-[9vw] leading-[0.88]">
              A second<br/><span className="italic">chapter,</span><br/>quietly worn.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-lg leading-relaxed text-foreground/75 max-w-md">
              Non-surgical hair systems, fitted in a private room behind the shop. No surgery, no scarring — just a careful match, expertly cut, and maintained for as long as you want it.
            </p>
            <Link to="/book" className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[12px] uppercase tracking-[0.22em] hover:gap-4 transition-all">
              Book a private consultation →
            </Link>
          </div>
        </div>
      </section>

      {/* Big image break */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img src={chair} alt="A private barber chair in low light" className="h-full w-full object-cover" loading="lazy" />
      </div>

      {/* Process */}
      <RevealSection className="relative bg-background py-32 md:py-44">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— The process</p>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Honest at every<br/><span className="italic">stage.</span>
          </h2>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {stages.map((s) => (
              <div key={s.n} className="border-t border-foreground/15 pt-6">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--leather)]">{s.n}</span>
                <h3 className="mt-3 font-display text-4xl">{s.t}</h3>
                <p className="mt-4 text-foreground/70 leading-relaxed max-w-md">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Sticky split */}
      <section className="relative bg-foreground text-background">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-2">
          <div className="md:sticky md:top-0 md:h-screen">
            <img src={tonic} alt="House restoration tonic" className="h-[60vh] md:h-full w-full object-cover opacity-90" loading="lazy" />
          </div>
          <div className="px-6 md:px-16 py-24 md:py-44 space-y-32">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-background/50">— Pricing</p>
              <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95]">Plain numbers,<br/><span className="italic text-[var(--leather)]">no upsell.</span></h2>
            </div>
            <ul className="divide-y divide-background/10 border-y border-background/10">
              {[
                ["Consultation", "Free", "60 min"],
                ["Initial fitting & cut", "From £450", "180 min"],
                ["Refit & maintenance", "From £75", "60 min"],
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

      {/* CTA */}
      <RevealSection className="relative bg-background py-32 md:py-44">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 text-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">— Begin</p>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.9]">
              Talk to us<br/><span className="italic">first.</span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-foreground/70 leading-relaxed">
              Every consultation is free, in person, and entirely without pressure. If we're not the right answer, we'll say so.
            </p>
            <Link to="/book" className="mt-10 inline-flex items-center gap-2 border border-foreground px-8 py-4 text-[12px] uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors">
              Reserve a private hour →
            </Link>
          </Reveal>
        </div>
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 mt-20">
          <img src={wall} alt="Reclaimed wood, warm light" className="w-full h-[40vh] object-cover" loading="lazy" />
        </div>
      </RevealSection>
    </SiteLayout>
  );
}
