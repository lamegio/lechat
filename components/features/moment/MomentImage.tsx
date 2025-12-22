"use client";

import { useState } from "react";
import Image from "next/image";
import ImageViewer from "@/components/ui/ImageViewer";

interface MomentImageProps {
  images: string[];
}

export default function MomentImage({ images }: MomentImageProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setInitialIndex(index);
    setViewerOpen(true);
  };

  const getGridClass = () => {
    const count = images.length;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    return "grid-cols-3";
  };

  const getAspectClass = (count: number) => {
    if (count === 1) return "aspect-video";
    if (count === 2) return "aspect-[4/3]";
    return "aspect-square";
  };

  return (
    <>
      <div className={`grid gap-2 mt-4 ${getGridClass()}`}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative ${getAspectClass(images.length)} rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 cursor-pointer group`}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={img}
              alt={`图片 ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        ))}
      </div>

      {viewerOpen && (
        <ImageViewer
          images={images}
          initialIndex={initialIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </>
  );
}
