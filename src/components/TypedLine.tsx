import { useEffect, useState } from "react";

export function TypedLine({ text, speed = 55, delay = 600, className = "" }: { text: string; speed?: number; delay?: number; className?: string }) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text.length);
      setDone(true);
      return;
    }
    let index = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1;
        setShown(index);
        if (index >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <p className={`typed-line ${className}`}>
      <span aria-label={text}>{text.slice(0, shown)}</span>
      {!done && <span className="typed-caret" aria-hidden="true" />}
    </p>
  );
}
