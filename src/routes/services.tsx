import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { RevealSection } from "@/components/site/Section";
import { MenuItemRow } from "@/components/site/MenuItemRow";
import { menu, allItems, type Tag } from "@/lib/menu";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "The Cuts — Services & Pricing | NV Barbers Nottingham" },
      { name: "description", content: "Browse the full NV Barbers list — signature cuts, fades, hot shaves, beard sculpts and grey blending. Reserve your chair in Nottingham." },
      { property: "og:title", content: "The Cuts — NV Barbers" },
      { property: "og:description", content: "The full NV Barbers list of services and pricing." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

const FILTERS: (Tag | "All")[] = ["All", "Signature", "Classic", "Beard", "Long Hair", "Quick", "Kids", "Premium"];

function ServicesPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [cart, setCart] = useState<string[]>([]);

  const total = useMemo(
    () => allItems.filter((i) => cart.includes(i.id)).reduce((s, i) => s + i.price, 0),
    [cart],
  );
  const totalDur = useMemo(
    () => allItems.filter((i) => cart.includes(i.id)).reduce((s, i) => s + parseInt(i.duration), 0),
    [cart],
  );

  const toggle = (id: string) =>
    setCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  return (
    <SiteLayout>
      {/* Header */}
      <section className="pt-40 md:pt-52 pb-16 md:pb-24 bg-background">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— The Cuts / Services</p>
          <div className="mt-8 grid grid-cols-12 gap-8 items-end">
            <h1 className="col-span-12 md:col-span-9 font-display text-[14vw] md:text-[10vw] leading-[0.88]">
              Order, like<br/><span className="italic">you mean it.</span>
            </h1>
            <p className="col-span-12 md:col-span-3 text-foreground/70 max-w-sm">
              Tap any service to add it to your chair. Mix freely — pair a cut with a beard sculpt, finish with a scalp treatment. Build your appointment, then reserve.
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-0 z-30 border-y border-foreground/10 bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-4 flex gap-1 md:gap-2 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] border transition-colors ${
                filter === f
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/20 text-foreground/70 hover:border-foreground/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      <div className="bg-background pb-40">
        {menu.map((section, sIdx) => {
          const items = section.items.filter((i) => filter === "All" || i.tags.includes(filter as Tag));
          if (!items.length) return null;
          return (
            <RevealSection key={section.id} className="mx-auto max-w-[1600px] px-6 md:px-12 pt-24">
              <div className="grid grid-cols-12 gap-8 items-end mb-10">
                <div className="col-span-12 md:col-span-8">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— {String(sIdx + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 font-display text-5xl md:text-7xl leading-[0.95]">{section.title}</h2>
                </div>
                <p className="col-span-12 md:col-span-4 text-foreground/70 italic font-display text-xl md:text-2xl">{section.subtitle}</p>
              </div>
              <div className="border-t border-foreground/10">
                {items.map((item, idx) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`block w-full text-left transition-colors ${cart.includes(item.id) ? "bg-[color-mix(in_oklab,var(--leather)_18%,transparent)]" : "hover:bg-foreground/[0.03]"}`}
                  >
                    <div className="px-3 md:px-6 relative">
                      {cart.includes(item.id) && (
                        <span className="absolute left-0 top-9 text-[var(--leather)] text-2xl">✓</span>
                      )}
                      <MenuItemRow item={item} index={idx} />
                    </div>
                  </button>
                ))}
              </div>
            </RevealSection>
          );
        })}
      </div>

      {/* Sticky cart bar */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-background/20 bg-foreground text-background"
        >
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-baseline gap-6">
              <span className="text-[11px] uppercase tracking-[0.22em] text-background/50">{cart.length} {cart.length === 1 ? "service" : "services"}</span>
              <span className="font-display text-3xl">£{total}</span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-background/50">≈ {totalDur} min</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setCart([])} className="text-[11px] uppercase tracking-[0.22em] text-background/60 hover:text-background">Clear</button>
              <Link to="/book" search={{ items: cart.join(",") }} className="border border-background px-5 py-2.5 text-[12px] uppercase tracking-[0.22em] hover:bg-background hover:text-foreground transition-colors">
                Reserve →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </SiteLayout>
  );
}
