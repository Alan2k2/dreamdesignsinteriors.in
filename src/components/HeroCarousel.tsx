"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function HeroCarousel({ images = [] }: { images?: string[] }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayImages = images.length > 0 ? images : [
    "/hero/spaces-curated.jpeg",
    "/hero/make-your-dreams.jpeg",
    "/hero/tradition-meets-comfort.jpeg"
  ];

  if (!isMounted) return <div className="absolute inset-0 w-full h-full z-0 bg-slate-900" />;

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-slate-900">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {displayImages.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={src}
                alt={`Luxury Interior Design ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover object-[15%_center] md:object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Global override for Swiper theme colors */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #cbd5e1 !important;
          opacity: 0.8 !important;
          width: 10px !important;
          height: 10px !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #0a857f !important;
          opacity: 1 !important;
          width: 24px !important;
          border-radius: 6px !important;
        }
      `}</style>
    </div>
  );
}
