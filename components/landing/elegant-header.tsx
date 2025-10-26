"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { ElegantMenu } from "./elegant-menu";
import Link from "next/link";

export function ElegantHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-serif italic cursor-pointer hover:opacity-70 transition-opacity"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Incubazar
            </motion.div>
          </Link>

          {/* Hamburger Menu Button */}
          <motion.button
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:opacity-70 transition-opacity group"
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className="w-6 h-0.5 bg-black transition-all group-hover:w-8" />
              <span className="w-6 h-0.5 bg-black" />
            </div>
          </motion.button>
        </div>
      </header>

      {/* Full Screen Menu */}
      <ElegantMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
