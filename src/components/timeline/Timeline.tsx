"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, BookOpen, Bug, Trophy, Rocket } from "lucide-react";
import { timeline, type TimelineItem } from "@/lib/content";
import SectionHeading from "@/components/shared/SectionHeading";
import ContributionGraph from "@/components/timeline/ContributionGraph";
import FloatingCode from "@/components/shared/FloatingCode";

const icons: Record<TimelineItem["icon"], React.ComponentType<{ className?: string }>> = {
  spark: Sparkles,
  code: Code2,
  book: BookOpen,
  bug: Bug,
  trophy: Trophy,
  rocket: Rocket,
};

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-28 sm:py-36">
      <FloatingCode />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="git log --the-journey" title="The Timeline" />

        <div className="relative mt-20">
          <div className="absolute left-[19px] top-0 h-full w-px bg-gradient-to-b from-cyan/60 via-violet/60 to-magenta/60 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-10 sm:space-y-4">
            {timeline.map((item, i) => (
              <TimelineRow key={i} item={item} index={i} Icon={icons[item.icon]} />
            ))}
          </div>
        </div>

        <ContributionGraph />
      </div>
    </section>
  );
}

function TimelineRow({
  item,
  index,
  Icon,
}: {
  item: TimelineItem;
  index: number;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative sm:flex sm:items-center sm:gap-10">
      <div
        className={`hidden sm:block sm:w-1/2 ${isEven ? "text-right" : "order-2 text-left"}`}
      >
        <TimelineCard item={item} fromSide={isEven ? -24 : 24} />
      </div>

      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
        className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full glass-strong neon-border sm:relative sm:left-auto"
      >
        <Icon className="h-4 w-4 text-cyan-bright" />
      </motion.div>

      <div className="pl-16 sm:hidden">
        <TimelineCard item={item} fromSide={16} />
      </div>

      <div className={`hidden sm:block sm:w-1/2 ${isEven ? "order-2" : ""}`} />
    </div>
  );
}

function TimelineCard({ item, fromSide }: { item: TimelineItem; fromSide: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromSide, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="glass mb-8 inline-block w-full rounded-2xl border border-white/10 p-5 text-left transition-colors hover:border-cyan/30 sm:mb-0"
    >
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-violet">
        {item.year}
      </span>
      <h3 className="mt-1.5 font-display text-lg font-semibold text-text-primary">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
    </motion.div>
  );
}
