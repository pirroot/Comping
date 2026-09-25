'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductGallery({
  images = [],
  alt_title,
}: {
  images?: string[];
  alt_title: string;
}) {
  const [active, setActive] = useState<string>(images[0]);

  return (
    <div className="flex h-full gap-4">
      {/* Thumbnails column */}
      <div className="flex w-16 shrink-0 flex-col gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(img)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
              active === img
                ? 'scale-105 border-[#c83b3b] shadow-md'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <Image
              src={img}
              alt={`${alt_title} - ${i + 1}`}
              fill
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative min-h-[360] flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
        <Image
          src={active}
          alt={alt_title}
          fill
          quality={100}
          className="rounded-2xl object-contain p-6 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
