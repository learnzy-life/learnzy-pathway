
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/landing/HeroSection';
import WellnessSection from '../components/landing/WellnessSection';
import AnalyticsSection from '../components/landing/AnalyticsSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CtaSection from '../components/landing/CtaSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Wellness + Learning Integration Section */}
        <WellnessSection />
        
        {/* Analytics Section */}
        <AnalyticsSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Testimonial/CTA Section */}
        <CtaSection />
      </main>
    </div>
  );
};

export default Index;
