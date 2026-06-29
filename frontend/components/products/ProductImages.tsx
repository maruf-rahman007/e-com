"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  thumbnail: string | null;
  title: string;
}

export default function ProductImages({ images, thumbnail, title }: Props) {
  const allImages = images.length > 0 ? images : thumbnail ? [thumbnail] : [];
  const [selected, setSelected] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 text-6xl">
        📦
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
        <Image
          src={allImages[selected]}
          alt={`${title} — image ${selected + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                "relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                selected === i
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-400"
              )}
            >
              <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
