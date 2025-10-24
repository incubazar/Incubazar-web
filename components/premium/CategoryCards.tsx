import { Card } from '@/components/ui/card'
import { Rocket, Users, Network, TrendingUp, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CategoryCards() {
  const categories = [
    {
      icon: Rocket,
      title: 'Startups',
      description: 'Showcase your innovation and connect with investors who align with your vision and goals.',
      stats: 'Section 42 Ready',
      color: 'lavender',
      href: '/startups',
    },
    {
      icon: Users,
      title: 'Investors',
      description: 'Discover pre-vetted startups matched to your investment preferences and expertise.',
      stats: 'Verified Network',
      color: 'mint',
      href: '/investors',
    },
    {
      icon: Network,
      title: 'Matching Network',
      description: 'AI-powered matching connects founders with the most compatible investors for their needs.',
      stats: 'Smart AI Matching',
      color: 'lavender',
      href: '/matching',
    },
    {
      icon: TrendingUp,
      title: 'Deal Flow',
      description: 'Access curated deal opportunities and track connections through our transparent platform.',
      stats: 'Curated Pipeline',
      color: 'mint',
      href: '/deals',
    },
    {
      icon: BookOpen,
      title: 'Resources',
      description: 'Master fundraising, investor relations, and private placement compliance with expert guides.',
      stats: '30+ Guides',
      color: 'lavender',
      href: '/resources',
    },
  ]

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white dark:bg-navy-900">
      <div className="container-premium px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3 md:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy-900 dark:text-white">
            Your Connection Hub{' '}
            <span className="text-gradient-premium">for Growth</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-navy-600 dark:text-cream-200 font-light px-4">
            Intelligent matching platform connecting founders with the right investors
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card 
                className={`relative p-6 md:p-8 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-2xl md:rounded-3xl shadow-soft hover:shadow-xl transition-premium transform hover:-translate-y-2 overflow-hidden h-full ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-premium ${
                  category.color === 'lavender' ? 'bg-gradient-to-br from-lavender-400 to-lavender-600' : 'bg-gradient-to-br from-mint-400 to-mint-600'
                }`} />
                
                {/* Content */}
                <div className="relative space-y-3 md:space-y-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-lg transition-premium ${
                    category.color === 'lavender' 
                      ? 'bg-gradient-to-br from-lavender-400 to-lavender-600' 
                      : 'bg-gradient-to-br from-mint-400 to-mint-600'
                  }`}>
                    <category.icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2} />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-semibold text-navy-900 dark:text-white mb-2 group-hover:text-lavender-600 dark:group-hover:text-lavender-400 transition-premium">
                      {category.title}
                    </h3>
                    <p className="text-navy-600 dark:text-cream-200 leading-relaxed text-sm md:text-base">
                      {category.description}
                    </p>
                  </div>

                  {/* Stats & Arrow */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-semibold text-navy-500 dark:text-cream-300">
                      {category.stats}
                    </span>
                    <ArrowRight className="w-5 h-5 text-navy-400 dark:text-cream-400 group-hover:text-lavender-600 dark:group-hover:text-lavender-400 group-hover:translate-x-1 transition-premium" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16 px-4">
          <p className="text-navy-500 dark:text-cream-300 text-xs md:text-sm mb-3 md:mb-4">
            Join a thriving ecosystem of innovators and investors
          </p>
          <Link href="/auth/register">
            <button className="text-lavender-600 dark:text-lavender-400 font-semibold text-sm hover:underline inline-flex items-center space-x-1 group">
              <span>Explore All Features</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
