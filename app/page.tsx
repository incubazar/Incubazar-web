import PremiumNavbar from '@/components/premium/PremiumNavbar'
import PremiumHero from '@/components/premium/PremiumHero'
import GradientCTA from '@/components/premium/GradientCTA'
import PremiumFooter from '@/components/premium/PremiumFooter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PremiumNavbar />
      <main>
        <PremiumHero />
        <GradientCTA />
      </main>
      <PremiumFooter />
    </div>
  )
}

