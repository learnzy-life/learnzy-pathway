
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, BrainCircuit, CheckCircle } from 'lucide-react';
import Header from '../components/Header';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-learnzy-purple/10 rounded-2xl flex items-center justify-center mb-6 animate-float">
            <BookOpen className="w-8 h-8 text-learnzy-purple" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 max-w-3xl">
            Diagnose Your <span className="text-gradient">Academic Level</span> With Precision
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            Take a comprehensive diagnostic test to identify your strengths and areas for improvement in Biology, Physics, and Chemistry.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/subjects" className="button-primary">
              Start Diagnostic Test <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/about" className="button-secondary">
              Learn More
            </Link>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose Learnzy?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our unique approach combines academic diagnostics with mental wellness to help you perform at your best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-glass p-6 card-hover">
              <div className="w-12 h-12 bg-learnzy-purple/10 rounded-xl flex items-center justify-center mb-4">
                <BrainCircuit className="w-6 h-6 text-learnzy-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Diagnostics</h3>
              <p className="text-muted-foreground">
                Subject-specific tests with detailed analytics to pinpoint your exact knowledge gaps.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card-glass p-6 card-hover">
              <div className="w-12 h-12 bg-learnzy-blue/10 rounded-xl flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-learnzy-blue">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mental Wellness Integration</h3>
              <p className="text-muted-foreground">
                Pre-test rituals and mood tracking to ensure you're in the right mindset for success.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card-glass p-6 card-hover">
              <div className="w-12 h-12 bg-learnzy-teal/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-learnzy-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Insights</h3>
              <p className="text-muted-foreground">
                Tailored recommendations based on your performance to guide your study plan.
              </p>
            </div>
          </div>
        </section>
        
        {/* Testimonial/CTA Section */}
        <section className="py-16 md:py-24">
          <div className="card-glass p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Discover Your Academic Strengths?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Join thousands of students who have used Learnzy to identify their knowledge gaps and improve their exam performance.
            </p>
            <Link to="/subjects" className="button-primary inline-flex">
              Start Your Diagnostic Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
