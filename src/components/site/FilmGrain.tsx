export function FilmGrain() {
  return (
    <svg style={{ position: "fixed", width: 0, height: 0, pointerEvents: "none" }} aria-hidden>
      <filter id="nv-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0" />
      </filter>
    </svg>
  );
}
