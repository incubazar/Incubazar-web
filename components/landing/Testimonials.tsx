'use client'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Founder, EduTech Pro',
      image: '👩‍💼',
      content: 'Incubazar connected me with the right investors who believed in my vision. Within 3 months, I raised ₹2.5 Cr and gained invaluable mentorship.',
      rating: 5,
      company: 'EdTech',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Angel Investor, Bangalore',
      image: '👨‍💼',
      content: 'The quality of deal flow on Incubazar is exceptional. Every startup is vetted, compliant, and ready for serious investors. Best platform I\'ve used.',
      rating: 5,
      company: 'Portfolio: 12 Startups',
    },
    {
      name: 'Anita Desai',
      role: 'Founder, HealthSync',
      image: '👩‍⚕️',
      content: 'The compliance support and legal templates saved me months of work. I could focus on building my product while Incubazar handled the paperwork.',
      rating: 5,
      company: 'HealthTech',
    },
    {
      name: 'Vikram Singh',
      role: 'Founder, AgriGrow',
      image: '👨‍🌾',
      content: 'Being from a Tier 2 city, I thought fundraising would be impossible. Incubazar proved me wrong. Now I have investors from across India backing my vision.',
      rating: 5,
      company: 'AgriTech',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="py-24 lg:py-32 bg-graphite-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header - Editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-ink">
            Success Stories
          </h2>
          <p className="text-lg md:text-xl text-graphite-600 font-body">
            Hear from founders and investors who transformed their journey with Incubazar
          </p>
        </div>

        {/* Main Testimonial - Monochrome */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-paper border-2 border-graphite-300 p-8 lg:p-12 shadow-editorial-xl">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-graphite-200 blur-xl" />
                  <Avatar className="relative w-20 h-20 lg:w-24 lg:h-24 border-4 border-graphite-300 shadow-editorial">
                    <AvatarFallback className="text-4xl bg-graphite-100">
                      {testimonials[activeIndex].image}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <Quote className="w-10 h-10 text-graphite-300" />
                <p className="text-lg lg:text-xl text-ink leading-relaxed italic font-body">
                  &quot;{testimonials[activeIndex].content}&quot;
                </p>
                <div className="flex items-center space-x-1 text-graphite-700">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <div>
                  <p className="font-serif font-semibold text-ink">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-sm text-graphite-600 font-body">
                    {testimonials[activeIndex].role}
                  </p>
                  <p className="text-xs text-ink font-medium mt-1">
                    {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Indicator Dots - Monochrome */}
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-8 bg-ink' 
                  : 'w-2 bg-graphite-300 hover:bg-graphite-500'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Small Cards - Monochrome */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          {testimonials.slice(1, 4).map((testimonial) => (
            <Card key={testimonial.name} className="p-6 bg-paper border-2 border-graphite-200 hover:border-ink transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="w-12 h-12 border border-graphite-300">
                  <AvatarFallback className="text-2xl bg-graphite-100">
                    {testimonial.image}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-serif font-semibold text-sm text-ink">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-graphite-600 font-body">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-graphite-600 leading-relaxed line-clamp-3 font-body">
                &quot;{testimonial.content}&quot;
              </p>
            </Card>
          ))}
        </div>

        {/* Stats - Monochrome */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 text-center">
          <div>
            <p className="text-4xl font-serif font-bold text-ink mb-2">Sec 42</p>
            <p className="text-sm text-graphite-600 font-body">Compliant</p>
          </div>
          <div>
            <p className="text-4xl font-serif font-bold text-graphite-800 mb-2">AI Driven</p>
            <p className="text-sm text-graphite-600 font-body">Smart Matching</p>
          </div>
          <div>
            <p className="text-4xl font-serif font-bold text-graphite-900 mb-2">100%</p>
            <p className="text-sm text-graphite-600 font-body">Digital Platform</p>
          </div>
        </div>
      </div>
    </section>
  )
}
