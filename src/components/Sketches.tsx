type SketchProps = { className?: string };

export function RibbonSketch({ className = "" }: SketchProps) {
  return (
    <svg className={`sketch ${className}`} width="96" height="96" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <path d="M48 34c-7-11-19-15-24-9s2 14 12 15c-9 2-14 8-11 13s13 3 18-6c4 8 13 12 18 7s-1-12-10-14c10-2 15-9 11-14s-15-2-20 8" />
      <path d="M48 46c-1 13-5 24-12 33M48 46c2 13 7 23 15 31" />
      <path d="M36 79l-6 4 2-8M63 77l7 4-3-8" />
    </svg>
  );
}

export function FlowerSketch({ className = "" }: SketchProps) {
  return (
    <svg className={`sketch ${className}`} width="88" height="88" viewBox="0 0 88 88" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <path d="M44 30c-8-9-19-6-19 4s10 13 19 8c9 5 19 2 19-8s-11-13-19-4" />
      <path d="M44 30c-5-9 0-18 8-18M44 34c-9-4-18 1-18 9M44 34c9-4 19 1 18 10" />
      <circle cx="44" cy="35" r="4" />
      <path d="M44 42c1 14 0 26-4 38M40 58c-7-2-12-7-13-14M44 62c7-1 13-6 15-13" />
    </svg>
  );
}

export function HeartSketch({ className = "" }: SketchProps) {
  return (
    <svg className={`sketch ${className}`} width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <path d="M36 58C22 47 12 39 12 29c0-8 6-13 12-13 5 0 9 3 12 8 3-5 7-8 12-8 6 0 12 5 12 13 0 10-10 18-24 29z" />
      <path d="M22 28c1-4 3-6 6-7" />
    </svg>
  );
}

export function LaceEdge({ flipped = false }: { flipped?: boolean }) {
  return <div className={`lace-edge ${flipped ? "is-flipped" : ""}`} aria-hidden="true" />;
}
