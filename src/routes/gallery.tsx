import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SiteLayout } from "@/components/site/Layout";
import grid from "@/assets/gallery/grid.png";
import chair from "@/assets/bg/chair.jpg";
import tools from "@/assets/bg/tools.jpg";
import wall from "@/assets/bg/wall.jpg";
import towels from "@/assets/bg/towels.jpg";
import tonic from "@/assets/bg/tonic.jpg";
import abstractImg from "@/assets/bg/abstract.jpg";
import hero from "@/assets/bg/hero.jpg";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — The Work | NV Barbers Nottingham" },
      { name: "description", content: "An archive of cuts, fades, beard work and the room itself. Photographed in the chair, lit by the same window." },
      { property: "og:title", content: "Gallery — NV Barbers" },
      { property: "og:description", content: "An archive of cuts, photographed in the chair." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

interface Item {
  src: string;
  alt: string;
  caption: string;
  span: string; // tailwind classes for layout
  height: string;
}

const items: Item[] = [
  { src: grid, alt: "A wall of recent client cuts", caption: "Recent work — the wall.", span: "col-span-12", height: "h-[80vh]" },
  { src: chair, alt: "Vintage barber chair in low light", caption: "The chair, rested.", span: "col-span-12 md:col-span-7 md:col-start-1", height: "h-[90vh]" },
  { src: tools, alt: "Vintage barbering tools", caption: "Tools, end of day.", span: "col-span-12 md:col-span-4 md:col-start-9 md:-mt-44", height: "h-[60vh]" },
  { src: wall, alt: "Reclaimed wood with gilded mirror", caption: "The mirror at four o'clock.", span: "col-span-12 md:col-span-9 md:col-start-3", height: "h-[70vh]" },
  { src: towels, alt: "Stack of cream towels on dark wood", caption: "Linens, before service.", span: "col-span-12 md:col-span-5 md:col-start-1", height: "h-[80vh]" },
  { src: tonic, alt: "House restoration tonic on aged wood", caption: "House tonic, slow morning light.", span: "col-span-12 md:col-span-5 md:col-start-7 md:-mt-32", height: "h-[80vh]" },
  { src: hero, alt: "The shop interior at golden hour", caption: "The room, golden hour.", span: "col-span-12", height: "h-[100vh]" },
  { src: abstractImg, alt: "Warm bokeh abstract", caption: "Detail, untitled.", span: "col-span-12 md:col-span-6 md:col-start-4", height: "h-[60vh]" },
];

function ParallaxImage({ item, idx }: { item: Item; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], idx % 2 === 0 ? [80, -80] : [-60, 60]);
  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`${item.span} relative overflow-hidden`}
    >
      <motion.div style={{ y, scale: 1.15 }} className={`relative ${item.height} w-full`}>
        <img src={item.src} alt={item.alt} className="absolute inset-0 h-full w-full object-cover" loading={idx < 2 ? "eager" : "lazy"} />
      </motion.div>
      <figcaption className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {String(idx + 1).padStart(2, "0")} — {item.caption}
      </figcaption>
    </motion.figure>
  );
}

function GalleryPage() {
  return (
    <SiteLayout>
      <section className="pt-40 md:pt-52 pb-16 bg-background">
        <div className="mx-auto max-w-[1800px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">— No. 04 / Gallery</p>
          <div className="mt-8 grid grid-cols-12 gap-8 items-end">
            <h1 className="col-span-12 md:col-span-9 font-display text-[14vw] md:text-[10.5vw] leading-[0.88]">
              The work,<br/><span className="italic">slowly.</span>
            </h1>
            <p className="col-span-12 md:col-span-3 text-foreground/70 max-w-sm">
              Scroll. The room moves at its own pace.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1800px] px-6 md:px-12 grid grid-cols-12 gap-6 md:gap-10 gap-y-32 md:gap-y-44">
          {items.map((it, i) => (
            <ParallaxImage key={i} item={it} idx={i} />
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
