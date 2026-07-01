"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  minPrice: string;
  maxPrice: string;
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
}

export default function PriceRangeFilter({ minPrice, maxPrice, onMinChange, onMaxChange }: Props) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const minTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const maxTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => { setLocalMin(minPrice); }, [minPrice]);
  useEffect(() => { setLocalMax(maxPrice); }, [maxPrice]);

  function handleMin(v: string) {
    setLocalMin(v);
    clearTimeout(minTimer.current);
    minTimer.current = setTimeout(() => onMinChange(v), 500);
  }

  function handleMax(v: string) {
    setLocalMax(v);
    clearTimeout(maxTimer.current);
    maxTimer.current = setTimeout(() => onMaxChange(v), 500);
  }

  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        Price range
      </h3>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          min={0}
          value={localMin}
          onChange={(e) => handleMin(e.target.value)}
          placeholder="Min"
          className="w-full py-1.5 px-2 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <span className="text-gray-400 text-sm shrink-0">–</span>
        <input
          type="number"
          min={0}
          value={localMax}
          onChange={(e) => handleMax(e.target.value)}
          placeholder="Max"
          className="w-full py-1.5 px-2 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
