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
    <div className="flex gap-4 h-full">
      {/* Thumbnails column */}
      <div className="flex flex-col gap-3 w-16 shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(img)}
            className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 ${active === img
              ? 'border-[#c83b3b] shadow-md scale-105'
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
      <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 min-h-[360]">
        <Image
          src={active}
          alt={alt_title}
          fill
          quality={100}
          className="object-contain p-6 transition-opacity duration-300 rounded-2xl"
        />
      </div>
    </div>
  );
}