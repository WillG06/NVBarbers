import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FilmGrain } from "./FilmGrain";
import { Cursor } from "./Cursor";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grain-layer min-h-screen flex flex-col">
      <FilmGrain />
      <Cursor />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
