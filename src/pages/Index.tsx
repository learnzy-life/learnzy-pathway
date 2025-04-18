import React from 'react'
import Header from '../components/Header'
import AnalyticsSection from '../components/landing/AnalyticsSection'
import CtaSection from '../components/landing/CtaSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import HeroSection from '../components/landing/HeroSection'
import WellnessSection from '../components/landing/WellnessSection'
import CountdownTimer from '../components/landing/CountdownTimer'
import YoutubeVideo from '../components/landing/YoutubeVideo'
import MockTestCyclesSection from '../components/landing/MockTestCyclesSection'
import { useAuth } from '../context/AuthContext'
import { useOnboardingStatus } from '../hooks/useOnboardingStatus'
import OnboardingNudge from '../components/OnboardingNudge'

const Index = () => {
  const { user } = useAuth()
  const { hasCompletedOnboarding, isLoading } = useOnboardingStatus()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Countdown Timer at the top */}
      <CountdownTimer />
      
      <Header />

      <main className="container mx-auto px-2 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-16 overflow-hidden">
        {/* Show nudge only for logged in users who haven't completed onboarding */}
        {user && !isLoading && !hasCompletedOnboarding && (
          <OnboardingNudge />
        )}

        {/* Hero Section */}
        <HeroSection />

        {/* Mock Test Cycles Section - New section */}
        <MockTestCyclesSection />

        {/* YouTube Video Tutorial Section */}
        <YoutubeVideo />

        {/* Features Section */}
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
