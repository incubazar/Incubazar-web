import Link from 'next/link'
import { Mail } from 'lucide-react'
import Image from 'next/image'

export default function PremiumFooter() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { label: 'Founder Dashboard', href: '/founder' },
      { label: 'Investor Dashboard', href: '/investor' },
      { label: 'Login', href: '/auth/login' },
      { label: 'Register', href: '/auth/register' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Disclaimer', href: '/legal/disclaimer' },
    ],
  }

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container-premium py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image 
                  src="/logo.svg" 
                  alt="Incubazar" 
                  width={40} 
                  height={40}
                  className="transition-all duration-300"
                />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Incubazar
              </span>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Connecting founders with investors and opportunities.
            </p>

            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <a href="mailto:hello@incubazar.com" className="hover:text-gray-900 dark:hover:text-white transition-smooth">
                hello@incubazar.com
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-smooth text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-smooth text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Incubazar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
