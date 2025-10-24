import { Card } from '@/components/ui/card'
import { Lightbulb, Users2, TrendingUp } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Lightbulb,
      title: 'Build',
      description: 'Create your profile, showcase your startup, and articulate your vision with powerful tools and templates.',
      color: 'electric',
      gradient: 'from-electric-400 to-electric-600',
    },
    {
      icon: Users2,
      title: 'Connect',
      description: 'Match with verified investors, experienced mentors, and strategic partners who align with your mission.',
      color: 'golden',
      gradient: 'from-golden-400 to-golden-600',
    },
    {
      icon: TrendingUp,
      title: 'Grow',
      description: 'Secure funding, gain insights, and scale your startup with expert guidance and a supportive community.',
      color: 'green',
      gradient: 'from-green-400 to-green-600',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-white dark:bg-graphite-900">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-graphite-700 dark:text-white">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-graphite-600 dark:text-gray-300">
            Your journey from idea to funded startup in three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700 z-0" />
              )}

              {/* Card */}
              <Card className="relative p-8 text-center shadow-soft hover:shadow-strong transition-smooth bg-white dark:bg-graphite-800 border-0 rounded-xl group-hover:scale-105 transform duration-300 z-10">
                {/* Icon Container */}
                <div className="relative mx-auto mb-6 w-20 h-20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`} />
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-medium`}>
                    <step.icon className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Step Number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-graphite-700 flex items-center justify-center">
                  <span className="text-sm font-bold text-graphite-600 dark:text-gray-300">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-poppins font-bold text-graphite-700 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-graphite-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-graphite-500 dark:text-gray-400 text-sm">
            Join India's <span className="font-bold text-electric">most trusted</span> startup-investor platform
          </p>
        </div>
      </div>
    </section>
  )
}
