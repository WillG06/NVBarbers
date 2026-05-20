"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Index" },
  { to: "/services", label: "The Cuts" },
  { to: "/restoration", label: "Restoration" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "Story" },
  { to: "/faq", label: "FAQ" },
] as const;

/* ─────────────────────────────────────────────────────────────
   Viewfinder corner-bracket Reserve button
───────────────────────────────────────────────────────────── */
function ReserveButton({ mobile = false }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);

  if (mobile) {
    return (
      <Link
        to="/book"
        className="mt-8 inline-flex items-center gap-3 self-start px-6 py-3 text-[11px] uppercase tracking-[0.24em]"
        style={{
          border: "1px solid var(--leather)",
          borderRadius: "999px",
          color: "var(--leather)",
        }}
      >
        Reserve a chair →
      </Link>
    );
  }

  return (
    <Link
      to="/book"
      className="hidden md:inline-flex relative items-center gap-3 px-7 py-[13px] overflow-hidden select-none"
      style={{
        border: "1px solid color-mix(in oklab, var(--leather) 75%, transparent)",
        borderRadius: "999px",
        color: hovered ? "#081010" : "var(--leather)",
        background: hovered
          ? "var(--leather)"
          : "transparent",
        transition:
          "all .45s cubic-bezier(0.22,1,0.36,1)",
        letterSpacing: "0.26em",
        fontSize: "10.5px",
        textTransform: "uppercase",
        boxShadow: hovered
          ? "0 0 24px color-mix(in oklab, var(--leather) 28%, transparent)"
          : "0 0 0px transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          position: "relative",
          zIndex: 1,
          fontWeight: 500,
        }}
      >
        Reserve
      </span>

      <span
        aria-hidden
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-block",
          transition:
            "transform .35s cubic-bezier(0.22,1,0.36,1)",
          transform: hovered
            ? "translateX(4px)"
            : "translateX(0)",
        }}
      >
        →
      </span>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Nav
───────────────────────────────────────────────────────────── */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Leather hairline at very top */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[1.5px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, var(--leather) 20%, var(--leather) 80%, transparent 100%)",
          opacity: scrolled ? 0.9 : 0.45,
          transition: "opacity 0.7s ease",
        }}
      />

      <header
        ref={navRef}
        className="fixed top-[1.5px] left-0 right-0 z-50"
        style={{
          background: scrolled
            ? "color-mix(in oklab, var(--foreground) 91%, transparent)"
            : "linear-gradient(180deg, rgba(8,14,14,0.46) 0%, rgba(8,14,14,0.18) 60%, rgba(8,14,14,0.0) 100%)",
          backdropFilter: scrolled ? "blur(20px) saturate(130%)" : "none",
          borderBottom: scrolled
            ? "1px solid color-mix(in oklab, var(--leather) 18%, transparent)"
            : "1px solid transparent",
          transition: "background 0.7s cubic-bezier(0.22,1,0.36,1), backdrop-filter 0.7s ease, border-color 0.7s ease",
        }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12 py-4 md:py-[18px]">

          {/* LOGO */}
          <Link to="/" className="relative z-10 flex items-center flex-shrink-0">
            <img
              src={logo}
              alt="NV Barbers"
              className="h-9 w-auto"
              style={{
                filter: "invert(1) brightness(2)",
                opacity: scrolled ? 0.95 : 0.78,
                transition: "opacity 0.7s ease",
              }}
            />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav
            className="hidden md:flex items-center"
            onMouseLeave={() => setActiveIndicator(null)}
          >
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onMouseEnter={(e) => {
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      const navRect = navRef.current?.getBoundingClientRect();
                      if (navRect) setActiveIndicator({ left: rect.left - navRect.left, width: rect.width });
                    }}
                    className="relative block px-3 py-2 text-[10.5px] uppercase tracking-[0.24em] transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                    activeProps={{ style: { color: "rgba(255,255,255,0.92)" } }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sliding leather underline */}
            <div
              className="pointer-events-none absolute bottom-0 h-[1px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                left: activeIndicator?.left ?? 0,
                width: activeIndicator?.width ?? 0,
                background: "var(--leather)",
                opacity: activeIndicator ? 1 : 0,
              }}
            />
          </nav>

          {/* RESERVE + MOBILE TOGGLE */}
          <div className="flex items-center gap-4">
            <ReserveButton />

            {/*
              Mobile burger.
              — Outer div is the visible 28×28 icon area
              — The button itself is 44×44 minimum to meet touch target guidelines,
                achieved with negative margin so it doesn't affect layout
              — touch-action: manipulation removes the 300ms tap delay
              — WebkitTapHighlightColor removes the grey flash on iOS
            */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden relative"
              style={{
                // Minimum 44×44 touch target via padding, keeping visual size small
                padding: "10px 8px",
                margin: "-10px -8px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                zIndex: 60,
              }}
            >
              {/* Visual icon: 28×20 */}
              <span className="flex flex-col justify-center gap-[5px] w-7" style={{ height: 20 }}>
                <span
                  className="block h-px w-full"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
                    transform: open ? "rotate(45deg) translateY(5px)" : "none",
                    transformOrigin: "center",
                  }}
                />
                <span
                  className="block h-px"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    width: open ? "100%" : "66%",
                    opacity: open ? 0 : 1,
                    transition: "opacity 0.3s ease, width 0.45s ease",
                  }}
                />
                <span
                  className="block h-px w-full"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
                    transform: open ? "rotate(-45deg) translateY(-5px)" : "none",
                    transformOrigin: "center",
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div
          className="md:hidden overflow-hidden"
          style={{
            maxHeight: open ? "520px" : "0px",
            transition: "max-height 0.65s cubic-bezier(0.22,1,0.36,1)",
            borderTop: open
              ? "1px solid color-mix(in oklab, var(--leather) 18%, transparent)"
              : "1px solid transparent",
            background: "color-mix(in oklab, var(--foreground) 97%, transparent)",
            backdropFilter: "blur(20px)",
          }}
        >
          <nav className="flex flex-col px-6 py-8 gap-0">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 border-b group"
                style={{
                  borderColor: "color-mix(in oklab, var(--leather) 12%, transparent)",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.26em",
                  transition: `color 0.2s ease ${i * 35}ms`,
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
                activeProps={{ style: { color: "var(--leather)" } }}
              >
                <span>{l.label}</span>
                <span
                  className="text-[10px] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ color: "var(--leather)" }}
                >
                  →
                </span>
              </Link>
            ))}

            <ReserveButton mobile />

            <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-white/25">
              14 Goose Gate, Hockley · NG1 1FF
            </p>
          </nav>
        </div>
      </header>
    </>
  );
}