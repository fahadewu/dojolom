"use client";

import { useEffect, useRef, useState } from "react";

/* True once the element has been on screen (or while it is, with once: false).
   Without IntersectionObserver everything counts as seen, so nothing stays hidden. */
export function useInView<T extends Element>({ once = true, threshold = 0.3 }: { once?: boolean; threshold?: number } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(() => typeof window !== "undefined" && typeof IntersectionObserver === "undefined");
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) io.disconnect();
      } else if (!once) setInView(false);
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);
  return [ref, inView] as const;
}
