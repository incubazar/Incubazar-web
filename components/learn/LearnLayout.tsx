'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import EditorialNavbar from '@/components/editorial/EditorialNavbar';
import { 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  FileText, 
  Lightbulb,
  Scale,
  Users,
  BarChart3,
  Wrench
} from 'lucide-react';

interface LearnLayoutProps {
  children: ReactNode;
}

const navigationItems = [
  {
    category: 'Foundation',
    items: [
      { href: '/learn', label: 'Overview', icon: BookOpen },
      { href: '/learn/incorporation', label: 'Incorporation & Legal', icon: Scale },
      { href: '/learn/finance', label: 'Finance & Funding', icon: TrendingUp },
    ]
  },
  {
    category: 'Building',
    items: [
      { href: '/learn/product', label: 'Product & GTM', icon: Lightbulb },
      { href: '/learn/pitching', label: 'Pitching & Decks', icon: FileText },
      { href: '/learn/brand', label: 'Brand & Design', icon: Briefcase },
    ]
  },
  {
    category: 'Growth',
    items: [
      { href: '/learn/trends', label: 'Industry Trends', icon: BarChart3 },
      { href: '/learn/case-studies', label: 'Case Studies', icon: Users },
      { href: '/learn/toolkits', label: 'Toolkits & Templates', icon: Wrench },
    ]
  }
];

export default function LearnLayout({ children }: LearnLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-paper">
      {/* Use the same header as the rest of the site */}
      <EditorialNavbar />

      {/* Fixed sidebar navigation */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r-2 border-ink bg-paper overflow-y-auto hidden lg:block">
        <div className="p-8">
          {/* Logo/Header */}
          <Link href="/learn" className="block mb-12">
            <h1 className="font-serif text-2xl font-bold text-ink tracking-tight">
              Founder&apos;s Circle
            </h1>
            <p className="text-sm text-graphite-600 mt-1">
              Learn. Build. Grow.
            </p>
          </Link>

          {/* Navigation */}
          <nav className="space-y-8">
            {navigationItems.map((section) => (
              <div key={section.category}>
                <h3 className="text-xs uppercase tracking-widest text-graphite-500 font-semibold mb-3">
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || 
                      (item.href !== '/learn' && pathname?.startsWith(item.href));

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200",
                            isActive
                              ? "bg-ink text-paper font-medium"
                              : "text-graphite-700 hover:bg-graphite-100 hover:text-ink"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Progress indicator */}
          <div className="mt-12 pt-8 border-t-2 border-graphite-200">
            <p className="text-xs uppercase tracking-widest text-graphite-500 font-semibold mb-3">
              Your Progress
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-graphite-600">Modules completed</span>
                <span className="font-semibold text-ink">0/24</span>
              </div>
              <div className="h-2 bg-graphite-200 overflow-hidden">
                <div 
                  className="h-full bg-ink transition-all duration-500"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="lg:ml-64 min-h-screen pt-16">
        {/* Top navigation for mobile */}
        <div className="lg:hidden sticky top-16 z-40 bg-paper border-b-2 border-ink">
          <div className="px-4 py-4">
            <Link href="/learn">
              <h1 className="font-serif text-xl font-bold text-ink">
                Founder&apos;s Circle
              </h1>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
