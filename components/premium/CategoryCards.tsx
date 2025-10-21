import { Card } from '@/components/ui/card'
import { Rocket, Users, GraduationCap, Building2, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CategoryCards() {
  const categories = [
    {
      icon: Rocket,
      title: 'Startups',
      description: 'Showcase your innovation and connect with investors who believe in your vision.',
      stats: '500+ Active',
      color: 'lavender',
      href: '/startups',
    },
    {
      icon: Users,
      title: 'Investors',
      description: 'Discover pre-vetted startups and invest in India\'s next generation of innovators.',
      stats: '200+ Active',
      color: 'mint',
      href: '/investors',
    },
    {
      icon: GraduationCap,
      title: 'Mentorship',
      description: 'Connect with experienced founders and industry experts for strategic guidance.',
      stats: '100+ Mentors',
      color: 'lavender',
      href: '/mentorship',
    },
    {
      icon: Building2,
      title: 'Incubation',
      description: 'Access resources, workspace, and support to accelerate your startup journey.',
      stats: '50+ Programs',
      color: 'mint',
      href: '/incubation',
    },
    {
      icon: BookOpen,
      title: 'Learning',
      description: 'Master fundraising, growth strategies, and startup essentials with expert courses.',
      stats: '30+ Courses',
      color: 'lavender',
      href: '/learning',
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-navy-900">
      <div className="container-premium">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 dark:text-white">
            Everything You Need{' '}
            <span className="text-gradient-premium">in One Place</span>
          </h2>
          <p className="text-lg md:text-xl text-navy-600 dark:text-cream-200 font-light">
            Comprehensive tools and resources for founders, investors, and entrepreneurs
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card 
                className={`relative p-8 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-3xl shadow-soft hover:shadow-xl transition-premium transform hover:-translate-y-2 overflow-hidden h-full ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-premium ${
                  category.color === 'lavender' ? 'bg-gradient-to-br from-lavender-400 to-lavender-600' : 'bg-gradient-to-br from-mint-400 to-mint-600'
                }`} />
                
                {/* Content */}
                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-lg transition-premium ${
                    category.color === 'lavender' 
                      ? 'bg-gradient-to-br from-lavender-400 to-lavender-600' 
                      : 'bg-gradient-to-br from-mint-400 to-mint-600'
                  }`}>
                    <category.icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-display font-semibold text-navy-900 dark:text-white mb-2 group-hover:text-lavender-600 dark:group-hover:text-lavender-400 transition-premium">
                      {category.title}
                    </h3>
                    <p className="text-navy-600 dark:text-cream-200 leading-relaxed text-sm">
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
        <div className="text-center mt-16">
          <p className="text-navy-500 dark:text-cream-300 text-sm mb-4">
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
