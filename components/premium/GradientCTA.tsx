import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function GradientCTA() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container-premium">
        <div className="max-w-3xl mx-auto text-center space-y-6 px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-tight">
            Ready to Get Started?
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Join India's trusted platform for founders and investors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/auth/register">
              <Button 
                size="lg" 
                className="px-8 py-6 text-base font-medium w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-base font-medium w-full sm:w-auto"
              >
                Contact Sales
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-500 pt-4">
            No credit card required • Free to join
          </p>
        </div>
      </div>
    </section>
  )
}
