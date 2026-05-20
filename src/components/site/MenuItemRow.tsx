import type { MenuItem } from "@/lib/menu";
import { motion } from "framer-motion";

const tagIcon: Record<string, string> = {
  Signature: "★",
  Classic: "◆",
  Quick: "⚡",
  "Long Hair": "〜",
  Kids: "✦",
  Beard: "⌇",
  Premium: "✦",
};

export function MenuItemRow({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
      className="group grid grid-cols-12 gap-4 md:gap-8 py-8 border-b border-foreground/10"
    >
      <div className="col-span-1 hidden md:block text-[11px] uppercase tracking-[0.2em] text-muted-foreground pt-2">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="col-span-12 md:col-span-7">
        <div className="flex items-baseline justify-between gap-4 md:hidden mb-2">
          <h3 className="font-display text-3xl">{item.name}</h3>
          <span className="font-display text-2xl">£{item.price}</span>
        </div>
        <h3 className="hidden md:block font-display text-4xl leading-tight">
          {item.name}
        </h3>
        <p className="mt-3 text-foreground/70 max-w-prose leading-relaxed text-[15px]">
          {item.description}
        </p>
        {item.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-foreground/15 text-[10px] uppercase tracking-[0.18em] text-foreground/65"
              >
                <span aria-hidden className="text-[var(--leather)]">{tagIcon[t] ?? "·"}</span>
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="hidden md:flex col-span-2 items-start text-[12px] uppercase tracking-[0.2em] text-muted-foreground pt-3">
        {item.duration}
      </div>
      <div className="hidden md:flex col-span-2 justify-end font-display text-3xl pt-1">
        £{item.price}
      </div>
    </motion.article>
  );
}
