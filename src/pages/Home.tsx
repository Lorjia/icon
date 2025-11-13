import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import IconShowcase from '@/components/IconShowcase'
import Footer from '@/components/Footer'
import ResultsGrid from '@/components/ResultsGrid'
import Toast from '@/components/Toast'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ResultsGrid />
      <Footer />
      <Toast />
    </div>
  )
}
