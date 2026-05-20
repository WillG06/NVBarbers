import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { RevealSection } from "@/components/site/Section";
import hero from "@/assets/bg/hero.jpg";
import wall from "@/assets/bg/wall.jpg";
import towels from "@/assets/bg/towels.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Story — A Modern Barbering House | NV Barbers Nottingham" },
      { name: "description", content: "How NV Barbers came to be — two chairs, three barbers, one room in Hockley, Nottingham." },
      { property: "og:title", content: "Story — NV Barbers" },
      { property: "og:description", content: "Two chairs, three barbers, one room in Hockley." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="pt-40 md:pt-52 pb-24 bg-background">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— Story</p>
            <h1 className="mt-6 font-display text-[13vw] md:text-[8vw] leading-[0.9]">
              Two chairs.<br/>Three barbers.<br/><span className="italic">One room.</span>
            </h1>
          </div>
          <p className="col-span-12 md:col-span-4 text-foreground/70 max-w-sm">
            We opened in 2018 with a single intention — to do less, better. Six years on, we still cut by appointment only.
          </p>
        </div>
      </section>

      <section className="relative bg-foreground text-background">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-2">
          <div className="md:sticky md:top-0 md:h-screen">
            <img src={hero} alt="" className="h-[60vh] md:h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="px-6 md:px-16 py-24 md:py-44 space-y-44">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--leather)]">01</span>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">An honest beginning.</h2>
              <p className="mt-6 text-background/75 leading-relaxed max-w-md">
                The shop was built by hand from reclaimed pallets and a stubborn refusal to take loans. The wood is older than the business; some of it older than us.
              </p>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--leather)]">02</span>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">A quiet philosophy.</h2>
              <p className="mt-6 text-background/75 leading-relaxed max-w-md">
                We turn down work we cannot do well. We don't sell colour, we don't fit extensions, we don't rush. Two chairs is a deliberate choice — it lets us breathe between appointments.
              </p>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--leather)]">03</span>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">A new chapter.</h2>
              <p className="mt-6 text-background/75 leading-relaxed max-w-md">
                In 2024 we opened a private restoration room behind the shop. Same hands, same standards — applied to a service most barbers won't talk about.
              </p>
              <Link to="/restoration" className="mt-6 inline-flex items-center gap-2 border-b border-background pb-1 text-[12px] uppercase tracking-[0.22em] hover:gap-4 transition-all">
                The restoration room →
              </Link>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--leather)]">04</span>
              <h2 className="mt-3 font-display text-5xl md:text-6xl">Where to find us.</h2>
              <p className="mt-6 text-background/75 leading-relaxed max-w-md">
                14 Goose Gate, Hockley. The door has no sign — only a small brass scissor. Press the buzzer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="bg-background py-32 md:py-44">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 md:col-span-6">
            <img src={wall} alt="" className="w-full h-[60vh] object-cover" loading="lazy" />
          </div>
          <div className="col-span-12 md:col-span-6 md:pl-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— The team</p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[0.95]">Hands<br/><span className="italic">that know.</span></h2>
            <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">
              Nathan, Vee and Marcus have, between them, forty-one years in the chair. They take on apprentices rarely — and only when the room is ready.
            </p>
          </div>
        </div>
      </RevealSection>

      <section className="relative h-[60vh] overflow-hidden">
        <img src={towels} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      </section>
    </SiteLayout>
  );
}
