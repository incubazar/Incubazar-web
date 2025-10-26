"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { number: "01", label: "PLATFORM", href: "/", description: "Connecting visionaries with investors" },
  { number: "02", label: "ABOUT", href: "/about", description: "Our story and mission" },
  { number: "03", label: "BRANDING", href: "/services/branding", description: "Premium design & brand identity" },
  { number: "04", label: "CALCULATOR", href: "/calculator", description: "Venture metrics & valuation tools" },
  { number: "05", label: "LEARNING HUB", href: "/learn", description: "Master the startup journey" },
  { number: "06", label: "FOR FOUNDERS", href: "/founder", description: "Raise funding & scale" },
  { number: "07", label: "FOR INVESTORS", href: "/investor", description: "Discover opportunities" },
];

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-b border-border">
            {/* Logo */}
            <Link href="/" onClick={onClose}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="relative w-10 h-10">
                  <Image 
                    src="/logo.svg" 
                    alt="Incubazar" 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="font-serif text-2xl font-bold">
                  Incubazar
                </span>
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
          <div className="flex flex-col items-start justify-start px-6 md:px-12 mt-6 md:mt-10 space-y-4 md:space-y-6 overflow-y-auto max-h-[calc(100vh-280px)]">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3 + index * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className={`group w-full border-b border-border/30 pb-4 md:pb-6 ${
                  index % 2 === 0 ? 'text-right' : 'text-left'
                }`}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block"
                >
                  <div className={`flex items-start gap-6 md:gap-12 ${
                    index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <span className="text-xs md:text-sm text-muted-foreground font-light mt-3 md:mt-4 min-w-[32px]">
                      /{item.number}
                    </span>
                    <div className="flex-1">
                      <h2 className={`text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight transition-transform duration-300 ${
                        index % 2 === 0 
                          ? 'group-hover:-translate-x-2' 
                          : 'group-hover:translate-x-2'
                      }`}>
                        {item.label}
                      </h2>
                      <p className="text-sm md:text-base text-muted-foreground mt-2 md:mt-3 transition-opacity duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 bg-background border-t border-border"
          >
            <div className="px-6 md:px-12 py-6 md:py-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                <p className="text-sm text-muted-foreground max-w-md">
                  We connect visionaries and help them turn ideas into investments.
                </p>
                
                {/* Social Links & Action Buttons */}
                <div className="flex items-center gap-6">
                  {/* Social Icons */}
                  <div className="flex items-center gap-3">
                    <Link
                      href="https://www.instagram.com/incubazar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-muted rounded-full transition-colors group"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/incubazar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-muted rounded-full transition-colors group"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                  </div>

                  {/* Auth/Dashboard Buttons */}
                  <div className="flex gap-4 pl-4 border-l border-border">
                    {!user ? (
                      <>
                        <Link 
                          href="/auth/login"
                          onClick={onClose}
                          className="px-6 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link 
                          href="/auth/register"
                          onClick={onClose}
                          className="px-6 py-2 bg-foreground text-background text-sm font-medium transition-all hover:bg-foreground/90"
                        >
                          Get Started
                        </Link>
                      </>
                    ) : (
                      <Link 
                        href="/founder"
                        onClick={onClose}
                        className="px-6 py-2 bg-foreground text-background text-sm font-medium transition-all hover:bg-foreground/90"
                      >
                        Go to Dashboard
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
