import { Card } from '@/components/ui/card'
import { Lightbulb, Users2, TrendingUp } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Lightbulb,
      title: 'Build',
      description: 'Create your profile, showcase your startup, and articulate your vision with powerful tools and templates.',
      gradient: 'from-graphite-700 to-ink',
    },
    {
      icon: Users2,
      title: 'Connect',
      description: 'Match with verified investors, experienced mentors, and strategic partners who align with your mission.',
      gradient: 'from-graphite-600 to-graphite-800',
    },
    {
      icon: TrendingUp,
      title: 'Grow',
      description: 'Secure funding, gain insights, and scale your startup with expert guidance and a supportive community.',
      gradient: 'from-graphite-800 to-graphite-950',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-paper">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header - Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-ink">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-graphite-600 font-body">
            Your journey from idea to funded startup in three simple steps
          </p>
        </div>

        {/* Steps Grid - Monochrome */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-graphite-300 to-transparent z-0" />
              )}

              {/* Card - Monochrome */}
              <Card className="relative p-8 text-center shadow-editorial hover:shadow-editorial-lg transition-all bg-paper border-2 border-graphite-200 group-hover:border-ink group-hover:-translate-y-1 transform duration-300 z-10">
                {/* Icon Container - Grayscale gradient */}
                <div className="relative mx-auto mb-6 w-20 h-20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-lg opacity-30 group-hover:opacity-50 transition-opacity`} />
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-editorial`}>
                    <step.icon className="w-10 h-10 text-paper" strokeWidth={2} />
                  </div>
                </div>

                {/* Step Number - Monochrome */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-graphite-100 border border-graphite-300 flex items-center justify-center">
                  <span className="text-sm font-bold text-ink">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-serif font-bold text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-graphite-600 leading-relaxed font-body">
                  {step.description}
                </p>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Monochrome */}
        <div className="text-center mt-16">
          <p className="text-graphite-500 text-sm font-body">
            Join India&apos;s <span className="font-bold text-ink">most trusted</span> startup-investor platform
          </p>
        </div>
      </div>
    </section>
  )
}
