
import React from 'react'
import Header from '../components/Header'
import AnalyticsSection from '../components/landing/AnalyticsSection'
import CtaSection from '../components/landing/CtaSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import HeroSection from '../components/landing/HeroSection'
import WellnessSection from '../components/landing/WellnessSection'
import CountdownTimer from '../components/landing/CountdownTimer'

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Countdown Timer at the top */}
      <CountdownTimer />
      
      <Header />

      <main className="container mx-auto px-2 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-16 overflow-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section - Moved up for better flow */}
        <FeaturesSection />

        {/* Wellness + Learning Integration Section */}
        <WellnessSection />

        {/* Analytics Section */}
        <AnalyticsSection />

        {/* Testimonial/CTA Section */}
        <CtaSection />
      </main>
    </div>
  )
}

export default Index
