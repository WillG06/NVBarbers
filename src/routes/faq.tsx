import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { RevealSection } from "@/components/site/Section";
import { motion } from "framer-motion";

const faqs = [
  { c: "Visiting", q: "Where exactly are you?", a: "14 Goose Gate, Hockley, Nottingham, NG1 1FF. Three minutes from the Lace Market tram stop, eight from the Victoria Centre." },
  { c: "Visiting", q: "Do you take walk-ins?", a: "Occasionally, but appointments are guaranteed. We hold a chair only when it's earned — booking ahead avoids disappointment." },
  { c: "Visiting", q: "Where do I park?", a: "There's a council car park on Fletcher Gate, two minutes away. Street parking on Goose Gate is metered until 18:00." },
  { c: "Visiting", q: "Are you accessible?", a: "There is one step into the shop. The restoration room is accessible via a separate, level entrance — please let us know in advance." },
  { c: "Services", q: "How long does a typical cut take?", a: "Forty to fifty-five minutes. We never rush. If you're tight on time, ask about The Tidy — twenty minutes, neckline and edges only." },
  { c: "Services", q: "Do you do beard work?", a: "Yes — sculpts, hot-towel shaves, and full beard rebuilds. Pair with any cut for a discount in the Cut & Beard package." },
  { c: "Services", q: "Do you cut children's hair?", a: "We have a quiet weekday slot for under-12s. Same standard, gentler pace." },
  { c: "Services", q: "Do you offer colour?", a: "We offer subtle grey blending only. We don't do fashion colour or bleach — there are people in Nottingham who do it better than we would." },
  { c: "Restoration", q: "What does hair restoration involve?", a: "Non-surgical hair systems — bonded or clipped pieces, matched to your hair colour and density, then cut and blended into your existing hair so the seam disappears." },
  { c: "Restoration", q: "Is the consultation really free?", a: "Yes, and there's no pressure to book. If we're not the right answer for you, we'll say so." },
  { c: "Restoration", q: "How private is it?", a: "The restoration room has its own diary, its own door, and its own waiting area. You will not see anyone else, and no one will see you." },
  { c: "Restoration", q: "How often do I need maintenance?", a: "Refits are every four to six weeks depending on the system and your skin. We schedule recurring slots so you never have to think about it." },
  { c: "Booking", q: "Can I cancel or reschedule?", a: "Yes — please give us at least 24 hours. Late cancellations forfeit the deposit." },
  { c: "Booking", q: "Do I need to leave a deposit?", a: "Bookings over £40 hold a 25% deposit, refunded against your bill on the day." },
  { c: "Booking", q: "Do you offer gift vouchers?", a: "Yes, in any value. Email us — they're posted in linen envelopes by hand." },
];

const groups = Array.from(new Set(faqs.map((f) => f.c)));

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ — Common Questions | NV Barbers Nottingham" },
      { name: "description", content: "Answers to common questions about NV Barbers — appointments, services, hair restoration, parking, and the studio in Hockley, Nottingham." },
      { property: "og:title", content: "FAQ — NV Barbers" },
      { property: "og:description", content: "Common questions about NV Barbers, Nottingham." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});


function FaqPage() {
  return (
    <SiteLayout>
      <section className="pt-40 md:pt-52 pb-16 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-9">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— FAQ</p>
            <h1 className="mt-6 font-display text-[12vw] md:text-[8vw] leading-[0.9]">
              Things worth<br/><span className="italic">asking.</span>
            </h1>
          </div>
          <p className="col-span-12 md:col-span-3 text-foreground/70 max-w-sm">
            Most answers are below. For anything else, write to us at hello@nvbarbers.co.uk.
          </p>
        </div>
      </section>

      <div className="bg-background pb-32 md:pb-44">
        {groups.map((g, gi) => (
          <RevealSection key={g} className="mx-auto max-w-[1400px] px-6 md:px-12 pt-20">
            <div className="grid grid-cols-12 gap-10 items-start">
              <div className="col-span-12 md:col-span-3">
                <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— {String(gi+1).padStart(2,"0")}</p>
                <h2 className="mt-4 font-display text-4xl md:text-5xl">{g}</h2>
              </div>
              <div className="col-span-12 md:col-span-9 divide-y divide-foreground/10 border-y border-foreground/10">
                {faqs.filter(f => f.c === g).map((f, i) => (
                  <motion.details
                    key={f.q}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="group py-6 cursor-pointer"
                  >
                    <summary className="flex justify-between items-baseline gap-6 list-none">
                      <span className="font-display text-2xl md:text-3xl">{f.q}</span>
                      <span className="text-[var(--leather)] text-2xl group-open:rotate-45 transition-transform duration-500">+</span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-foreground/70 leading-relaxed">{f.a}</p>
                  </motion.details>
                ))}
              </div>
            </div>
          </RevealSection>
        ))}

        <div className="mx-auto max-w-[1400px] px-6 md:px-12 mt-32 text-center">
          <h2 className="font-display text-5xl md:text-6xl">Didn't find it?</h2>
          <p className="mt-4 text-foreground/70">We answer email same day.</p>
          <Link to="/book" className="mt-8 inline-flex items-center gap-2 border border-foreground px-6 py-3 text-[12px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors">
            Reserve a chair →
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
