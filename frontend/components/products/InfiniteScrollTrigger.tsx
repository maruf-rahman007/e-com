"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  onIntersect: () => void;
  hasMore: boolean;
  loading: boolean;
}

export default function InfiniteScrollTrigger({ onIntersect, hasMore, loading }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) onIntersect();
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onIntersect, loading]);

  if (!hasMore) return null;

  return (
    <div ref={ref} className="py-10 flex justify-center">
      {loading && (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading more…</span>
        </div>
      )}
    </div>
  );
}
