import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Github } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { label: 'For Founders', href: '/founder' },
      { label: 'For Investors', href: '/investor' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Success Stories', href: '#testimonials' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Disclaimer', href: '/legal/disclaimer' },
      { label: 'Cookie Policy', href: '/legal/cookies' },
    ],
    resources: [
      { label: 'Help Center', href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'API Access', href: '/api' },
      { label: 'Partner Program', href: '/partners' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/incubazar', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/incubazar', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/incubazar', label: 'Instagram' },
    { icon: Github, href: 'https://github.com/incubazar', label: 'GitHub' },
  ]

  return (
    <footer className="bg-graphite-700 dark:bg-graphite-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-2xl lg:text-3xl font-poppins font-bold">
              Stay Updated
            </h3>
            <p className="text-white/80 text-lg">
              Get the latest startup insights, funding opportunities, and exclusive events delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-electric"
              />
              <Button className="gradient-electric text-white px-8 shadow-glow-blue hover:shadow-strong transition-smooth">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-white/60">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Image 
                  src="/logo.svg" 
                  alt="Incubazar" 
                  width={48} 
                  height={48}
                  className="transition-all duration-300"
                />
              </div>
              <span className="text-2xl font-poppins font-bold text-white">
                Incubazar
              </span>
            </Link>
            <p className="text-white/70 leading-relaxed">
              We connect visionaries and help them turn ideas into investments. India's trusted platform connecting founders with investors, mentors, and opportunities.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:founder@incubazar.com" className="hover:text-electric transition-smooth">
                  founder@incubazar.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+911234567890" className="hover:text-electric transition-smooth">
                  +91 123 456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/70 hover:text-electric transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/70 hover:text-electric transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/70 hover:text-electric transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/70 hover:text-electric transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/60">
              © {currentYear} Incubazar. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-electric flex items-center justify-center transition-smooth group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-smooth" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
