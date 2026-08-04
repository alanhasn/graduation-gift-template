"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { galleryImages } from "@/lib/content";
import SectionHeading from "@/components/shared/SectionHeading";
import Lightbox from "@/components/gallery/Lightbox";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="./memories" title="Memory Gallery" />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {galleryImages.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl glass border border-white/10 text-left animate-float-slow"
              style={{ animationDelay: `${i * 0.6}s` }}
              whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-mono text-sm text-text-primary">{img.caption}</p>
              </div>
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full glass-strong opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5 text-cyan-bright" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
