import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-foreground text-background">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="font-display text-5xl md:text-6xl leading-[0.95]">
            NV<span className="italic text-[var(--leather)]">.</span><br/>Barbers.
          </h3>
          <p className="mt-6 max-w-md text-background/70 text-sm leading-relaxed">
            A modern barbering house in Nottingham — classic disciplines, contemporary execution, and a quiet obsession with detail.
          </p>
        </div>
        <div className="text-sm space-y-2">
          <h4 className="text-[11px] uppercase tracking-[0.22em] text-background/50 mb-4">Visit</h4>
          <p>14 Goose Gate</p>
          <p>Hockley, Nottingham</p>
          <p>NG1 1FF</p>
          <p className="pt-3">Tue – Sat · 09:00 – 18:00</p>
        </div>
        <div className="text-sm space-y-2">
          <h4 className="text-[11px] uppercase tracking-[0.22em] text-background/50 mb-4">Index</h4>
          {[
            ["The Cuts", "/services"],
            ["Restoration", "/restoration"],
            ["Gallery", "/gallery"],
            ["Story", "/about"],
            ["FAQ", "/faq"],
            ["Reserve", "/book"],
          ].map(([l, h]) => (
            <Link key={h} to={h} className="block text-background/80 hover:text-background">
              {l}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between text-[11px] uppercase tracking-[0.2em] text-background/50 gap-2">
          <span>© {new Date().getFullYear()} NV Barbers, Nottingham</span>
          <span>Crafted with intent</span>
        </div>
      </div>
    </footer>
  );
}
