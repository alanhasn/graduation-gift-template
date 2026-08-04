"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MusicProvider } from "@/context/MusicContext";
import BackgroundFX from "@/components/shared/BackgroundFX";
import CursorGlow from "@/components/shared/CursorGlow";
import SiteChrome from "@/components/shared/SiteChrome";
import BootScreen from "@/components/boot/BootScreen";
import Hero from "@/components/hero/Hero";
import Timeline from "@/components/timeline/Timeline";
import Gallery from "@/components/gallery/Gallery";
import Terminal from "@/components/terminal/Terminal";
import Achievement from "@/components/achievement/Achievement";
import Roadmap from "@/components/roadmap/Roadmap";
import Letter from "@/components/letter/Letter";
import Celebration from "@/components/celebration/Celebration";
import Ending from "@/components/ending/Ending";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <MusicProvider>
      <BootScreen onDone={() => setBooted(true)} />

      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-1"
          >
            <BackgroundFX />
            <CursorGlow />
            <SiteChrome />

            <main className="relative z-10">
              <Hero />
              <Timeline />
              <Gallery />
              <Terminal />
              <Achievement />
              <Roadmap />
              <Letter />
              <Celebration />
              <Ending />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </MusicProvider>
  );
}
