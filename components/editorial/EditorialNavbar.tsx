'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ScrollProgress from './ScrollProgress';
import { FullScreenMenu } from './FullScreenMenu';
import { Menu } from 'lucide-react';

export default function EditorialNavbar() {
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex-shrink-0 transition-transform group-hover:scale-110">
                <Image 
                  src="/logo.svg" 
                  alt="Incubazar" 
                  width={40} 
                  height={40}
                  className="transition-all duration-300 object-contain"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                Incubazar
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {user ? (
                <Link 
                  href="/founder" 
                  className="px-6 py-2 bg-foreground text-background text-sm font-medium transition-all hover:bg-foreground/90"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="px-6 py-2 bg-foreground text-background text-sm font-medium transition-all hover:bg-foreground/90"
                  >
                    Get Started
                  </Link>
                </>
              )}
              
              {/* Menu Button */}
              <button
                onClick={() => setIsFullScreenMenuOpen(true)}
                className="p-2 hover:bg-muted rounded-md transition-colors group"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 transition-transform group-hover:scale-110" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsFullScreenMenuOpen(true)}
                className="p-2 hover:bg-muted rounded-md transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <FullScreenMenu isOpen={isFullScreenMenuOpen} onClose={() => setIsFullScreenMenuOpen(false)} />
    </>
  );
}
