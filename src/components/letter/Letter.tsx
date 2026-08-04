"use client";

import { motion } from "framer-motion";
import { letter } from "@/lib/content";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Letter() {
  return (
    <section id="letter" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-2xl px-6">
        <SectionHeading eyebrow="cat letter.txt" title="A Letter For You" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-14 overflow-hidden rounded-3xl glass-strong border border-white/10 p-8 sm:p-12"
        >
          <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-violet/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-cyan/20 blur-3xl" />

          <div className="relative font-display text-2xl leading-relaxed text-text-primary sm:text-3xl">
            &ldquo;
          </div>

          <div className="relative -mt-6 space-y-5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-xl font-medium text-text-primary"
            >
              {letter.salutation}
            </motion.p>

            {letter.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="text-base leading-[1.9] text-text-secondary"
              >
                {p}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-2 font-display text-lg font-medium text-gradient"
            >
              {letter.closing}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
