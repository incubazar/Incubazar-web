"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  platform: [
    { label: "For Founders", href: "/founder" },
    { label: "For Investors", href: "/investor" },
    { label: "Calculator", href: "/calculator" },
    { label: "Learning Hub", href: "/learn" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/messages" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
  ],
};

export function ElegantFooter() {
  return (
    <footer className="border-t border-gray-200 px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 
                className="text-3xl md:text-4xl font-serif italic mb-6" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Incubazar
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Connecting visionary founders with strategic investors to build the future of innovation.
              </p>
            </motion.div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-6">Platform</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-700 hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-700 hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500"
        >
          <p>© {new Date().getFullYear()} Incubazar. All rights reserved.</p>
          <p>Designed for those who dare to build.</p>
        </motion.div>
      </div>
    </footer>
  );
}
