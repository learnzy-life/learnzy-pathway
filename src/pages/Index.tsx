
import React from 'react'
import Header from '../components/Header'
import SuccessStoriesSection from '../components/landing/SuccessStoriesSection'
import WhyLearnzySection from '../components/landing/WhyLearnzySection'
import HeroSection from '../components/landing/HeroSection'
import YoutubeVideo from '../components/landing/YoutubeVideo'
import FreeResourcesSection from '../components/landing/FreeResourcesSection'
import StudentFeedbackSection from '../components/landing/StudentFeedbackSection'
import AnalyticsSection from '../components/landing/AnalyticsSection'
import FooterSection from '../components/landing/FooterSection'
import BriefCyclesSection from '../components/landing/BriefCyclesSection'
import { useAuth } from '../context/AuthContext'
import { useOnboardingStatus } from '../hooks/useOnboardingStatus'
import OnboardingNudge from '../components/OnboardingNudge'

const Index = () => {
  const { user } = useAuth()
  const { hasCompletedOnboarding, isLoading } = useOnboardingStatus()

  console.log('User auth state:', { user, hasCompletedOnboarding, isLoading })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      <Header />

      <main className="container mx-auto px-2 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-16 overflow-hidden">
        {/* Show nudge only for logged in users who haven't completed onboarding */}
        {user && !isLoading && !hasCompletedOnboarding && (
          <div className="mb-8">
            <OnboardingNudge />
          </div>
        )}

        {/* Hero Section */}
        <HeroSection />

        {/* Success Stories Section */}
        <SuccessStoriesSection />
        
        {/* Free Resources Section */}
        <FreeResourcesSection />

        {/* Brief Cycles Section - New addition */}
        <BriefCyclesSection />

        {/* Why Learnzy Section */}
        <WhyLearnzySection />

        {/* Student Feedback Section */}
        <StudentFeedbackSection />
        
        {/* YouTube Video Tutorial Section */}
        <YoutubeVideo />

        {/* Analytics Section */}
        <AnalyticsSection />

        {/* Footer Section */}
        <FooterSection />
      </main>
    </div>
  )
}

export default Index
