"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface ElegantMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { number: "01", label: "PLATFORM", href: "/" },
  { number: "02", label: "ABOUT", href: "/about" },
  { number: "03", label: "CALCULATOR", href: "/calculator" },
  { number: "04", label: "LEARNING", href: "/learn" },
  { number: "05", label: "JOIN", href: "/register" },
];

export function ElegantMenu({ isOpen, onClose }: ElegantMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
            {/* Logo */}
            <Link href="/" onClick={onClose}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-3xl md:text-4xl font-serif italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Incubazar
              </motion.div>
            </Link>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              onClick={onClose}
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </motion.button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col items-start justify-center px-6 md:px-24 mt-12 md:mt-24 space-y-8 md:space-y-12">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="group"
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block"
                >
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="text-sm md:text-base text-gray-400 font-light">
                      /{item.number}
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight group-hover:italic transition-all duration-300">
                      {item.label}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-8 left-6 md:left-24 right-6 md:right-24"
          >
            <p className="text-sm md:text-base text-gray-500 max-w-md">
              Connecting visionary founders with strategic investors to build the future of innovation.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
