import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchGalleryData } from "../reasctquery/api";

const ROLL_VARIANTS = {
  up: { initial: { y: "100%", x: 0 }, exit: { y: "-100%", x: 0 } },
  down: { initial: { y: "-100%", x: 0 }, exit: { y: "100%", x: 0 } },
  left: { initial: { x: "100%", y: 0 }, exit: { x: "-100%", y: 0 } },
  right: { initial: { x: "-100%", y: 0 }, exit: { x: "100%", y: 0 } },
};

const GalleryTile = ({ images, index, direction }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    let timeoutId;
    const triggerRoll = () => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
      timeoutId = setTimeout(triggerRoll, 8000 + Math.random() * 12000);
    };
    timeoutId = setTimeout(triggerRoll, index * 2000 + Math.random() * 4000);
    return () => clearTimeout(timeoutId);
  }, [images.length, index]);

  const variant = ROLL_VARIANTS[direction] || ROLL_VARIANTS.up;
  const imageUrl = images[currentImgIndex]?.url;

  if (!imageUrl) return null;

  return (
    <div className="relative w-full aspect-square overflow-hidden bg-transparent">
      <AnimatePresence mode="wait">
        <motion.div
          key={imageUrl}
          initial={variant.initial}
          animate={{ x: 0, y: 0 }}
          exit={variant.exit}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={imageUrl}
            alt="Gallery"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const GallerySlider = () => {
  const { data: galleryData, isLoading, isError } = useQuery({
    queryKey: ["galleryData"],
    queryFn: fetchGalleryData,
  });

  const allImages = useMemo(() => {
    if (!galleryData || !Array.isArray(galleryData)) return [];
    const extracted = [];
    galleryData.forEach((item) => {
      if (item.images && Array.isArray(item.images)) {
        item.images.forEach((img) => {
          extracted.push({ url: img.url });
        });
      }
    });
    return extracted;
  }, [galleryData]);

  const directions = ["up", "right", "down", "left"];

  const tileBundles = useMemo(() => {
    if (!allImages.length) return [];
    return Array.from({ length: 12 }, (_, i) =>
      Array.from(
        { length: 4 },
        (_, j) => allImages[(i * 3 + j) % allImages.length]
      )
    );
  }, [allImages]);

  if (isLoading || isError || !allImages.length) return null;

  return (
    <div className="w-full py-10 bg-transparent overflow-hidden">
      {/* Header - Styled to match OurServices better */}
      <div className="text-center mb-12 px-4">
        <p className="text-[#D89D55] font-bold text-xs tracking-[0.4em] uppercase mb-3">
          Our Gallery
        </p>
        <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white tracking-tight">
          Glimpses of <span className="text-[#D89D55]">Impact</span>
        </h2>
        <div className="h-1 w-20 bg-[#D89D55] mx-auto rounded-full" />
      </div>

      {/* Gallery Grid - Removed gap and rounded corners */}
      <div className="w-full px-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-0">
          {tileBundles.map((bundle, i) => (
            <GalleryTile
              key={i}
              images={bundle}
              index={i}
              direction={directions[i % 4]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;