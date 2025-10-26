"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ElegantHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-24 md:py-32">
      {/* Pre-headline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm md:text-base text-gray-500 mb-8 tracking-wider uppercase"
      >
        Hello, Visionaries. Meet Incubazar.
      </motion.p>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-center max-w-5xl leading-tight mb-12"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        CONNECTING THE
        <br />
        <span className="italic">FEW WHO BUILD</span>
        <br />
        THE FUTURE
      </motion.h1>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-2xl text-center mb-12"
      >
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Welcome to the future of startup funding and investor connections. 
          Explore how Incubazar can help you turn your vision into reality.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          href="/register"
          className="group px-8 py-4 bg-black text-white hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
        >
          <span>Join the Platform</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/about"
          className="px-8 py-4 border border-black hover:bg-black hover:text-white transition-all duration-300"
        >
          Learn More
        </Link>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs tracking-wider uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-12 bg-gray-300"
          />
        </div>
      </motion.div>
    </section>
  );
}
