"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = { src: string; caption: string };

export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onNavigate]);

  const image = images[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-void/90 backdrop-blur-md px-4"
        onClick={onClose}
      >
        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full glass-strong text-text-primary"
        >
          <X className="h-5 w-5" />
        </motion.button>

        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((index - 1 + images.length) % images.length);
          }}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass-strong text-text-primary sm:left-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((index + 1) % images.length);
          }}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full glass-strong text-text-primary sm:right-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <motion.div
          key={image.src}
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl glass-strong border border-white/10"
        >
          <div className="relative h-[70vh] w-full">
            <Image
              src={image.src}
              alt={image.caption}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-contain"
            />
          </div>
          <div className="border-t border-white/10 p-4 text-center font-mono text-sm text-text-secondary">
            {image.caption}
            <span className="ml-2 text-text-muted">
              ({index + 1}/{images.length})
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
