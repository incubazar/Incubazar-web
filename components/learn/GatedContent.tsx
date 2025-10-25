'use client';

import { Lock, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GatedContentProps {
  title: string;
  description: string;
  benefits: string[];
  userRole: 'founder' | 'investor' | 'admin' | null;
  verificationStatus: 'pending' | 'verified' | 'rejected' | null;
}

export default function GatedContent({
  title,
  description,
  benefits,
  userRole,
  verificationStatus,
}: GatedContentProps) {
  const getMessage = () => {
    if (!userRole) {
      return {
        heading: 'Sign In to Access',
        subheading: 'Create an account to unlock this premium content',
        ctaText: 'Create Account',
        ctaLink: '/register',
      };
    }

    if (userRole === 'founder' && verificationStatus === 'pending') {
      return {
        heading: 'Verification Required',
        subheading: 'Complete the verification process to access premium learning content',
        ctaText: 'Check Verification Status',
        ctaLink: '/waitlist',
      };
    }

    if (userRole === 'founder' && verificationStatus === 'rejected') {
      return {
        heading: 'Verification Required',
        subheading: 'Your verification was not approved. Contact support for assistance.',
        ctaText: 'Contact Support',
        ctaLink: '/waitlist',
      };
    }

    // Default for waitlist users
    return {
      heading: 'Premium Content',
      subheading: 'Upgrade your account to access this exclusive content',
      ctaText: 'Learn More',
      ctaLink: '/waitlist',
    };
  };

  const message = getMessage();

  return (
    <div className="min-h-screen bg-paper py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Lock Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-6 border-2 border-ink bg-graphite-50">
            <Lock className="h-16 w-16 text-ink" />
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink mb-4">
            {message.heading}
          </h1>
          <p className="text-xl text-graphite-700">
            {message.subheading}
          </p>
        </div>

        {/* Content Preview */}
        <div className="mb-12 p-8 border-2 border-ink bg-graphite-50">
          <div className="flex items-start gap-4 mb-6">
            <Zap className="h-6 w-6 text-ink flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink mb-2">
                {title}
              </h2>
              <p className="text-lg text-graphite-800">
                {description}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-ink flex-shrink-0 mt-0.5" />
                <span className="text-graphite-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={message.ctaLink}
            className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-paper font-semibold hover:bg-graphite-900 transition-colors"
          >
            {message.ctaText}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-16 pt-8 border-t-2 border-graphite-200">
          <h3 className="font-serif text-xl font-bold text-ink mb-4 text-center">
            What You'll Get with Full Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-graphite-300">
              <h4 className="font-semibold text-ink mb-2">73+ Learning Modules</h4>
              <p className="text-sm text-graphite-700">
                Comprehensive curriculum covering legal, finance, product, GTM, branding, and more
              </p>
            </div>
            <div className="p-6 border-2 border-graphite-300">
              <h4 className="font-semibold text-ink mb-2">Interactive Tools</h4>
              <p className="text-sm text-graphite-700">
                Calculators for cap tables, unit economics, burn rate, valuation modeling
              </p>
            </div>
            <div className="p-6 border-2 border-graphite-300">
              <h4 className="font-semibold text-ink mb-2">Downloadable Templates</h4>
              <p className="text-sm text-graphite-700">
                Pitch decks, financial models, contracts, checklists—ready to use
              </p>
            </div>
          </div>
        </div>

        {/* Role-Specific Message */}
        {userRole === 'investor' && (
          <div className="mt-12 p-6 bg-ink text-paper">
            <p className="text-center">
              <strong>Note:</strong> As an investor, you already have access to all learning content. 
              If you're seeing this page, please contact support.
            </p>
          </div>
        )}

        {userRole === 'admin' && (
          <div className="mt-12 p-6 bg-ink text-paper">
            <p className="text-center">
              <strong>Note:</strong> As an admin, you have full access to all content. 
              This page is shown for testing purposes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
