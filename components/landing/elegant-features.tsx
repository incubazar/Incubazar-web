"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    number: "01",
    title: "For Founders",
    description: "Present your vision to a curated network of angel investors. Get matched with strategic partners who understand your industry and growth potential.",
  },
  {
    number: "02",
    title: "For Investors",
    description: "Discover vetted early-stage startups across diverse sectors. Access detailed analytics, founder profiles, and investment opportunities.",
  },
  {
    number: "03",
    title: "Compliant & Secure",
    description: "Every transaction follows Section 42 guidelines. Built on trust, transparency, and regulatory compliance for peace of mind.",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="border-t border-gray-200 py-12 md:py-16"
    >
      <div className="grid md:grid-cols-3 gap-8">
        <div className="flex items-start gap-4 md:col-span-1">
          <span className="text-sm text-gray-400 font-light">/{feature.number}</span>
          <h3 className="text-2xl md:text-3xl font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
            {feature.title}
          </h3>
        </div>
        <div className="md:col-span-2">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ElegantFeatures() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight max-w-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          A platform designed for those who dare to
          <span className="italic"> build the extraordinary</span>
        </h2>
      </motion.div>

      <div className="space-y-0">
        {features.map((feature, index) => (
          <FeatureCard key={feature.number} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
