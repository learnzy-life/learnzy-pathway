
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, BrainCircuit, CheckCircle, Sparkles, HeartPulse, Medal, BarChart, Brain } from 'lucide-react';
import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-24 flex flex-col items-center text-center relative">
          {/* Background Element */}
          <div className="absolute top-20 right-10 md:right-20 opacity-5 w-64 h-64 rotate-12">
            <Brain className="w-full h-full text-learnzy-purple" />
          </div>
          
          <div className="w-16 h-16 bg-learnzy-purple/10 rounded-2xl flex items-center justify-center mb-6 animate-float">
            <BookOpen className="w-8 h-8 text-learnzy-purple" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 max-w-3xl leading-tight z-10">
            Learning <span className="text-gradient">Made Simple</span> for Your Success
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-10 z-10">
            Find out your strong and weak points while taking care of your mental health. Our easy approach helps you do your best in studies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/subjects" className="button-primary w-full sm:w-auto">
              Start Test Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/about" className="button-secondary w-full sm:w-auto">
              Learn More
            </Link>
          </div>
          
          {/* NEET 2025 Alert */}
          <div className="mt-10 bg-amber-50 p-4 rounded-lg border border-amber-100 max-w-2xl mx-auto animate-pulse-soft">
            <h3 className="font-semibold text-amber-800">NEET 2025 Update!</h3>
            <p className="text-amber-700 text-sm mt-1">
              Get ready for NEET 2025 with our specialized tests! Start early to improve your chances of success. Prep with our smart tools today.
            </p>
          </div>
        </section>
        
        {/* Wellness + Learning Integration Section */}
        <section className="py-12 md:py-16 relative">
          {/* Background Element */}
          <div className="absolute bottom-20 left-0 opacity-5 w-72 h-72 -rotate-12">
            <HeartPulse className="w-full h-full text-red-400" />
          </div>
          
          <div className="text-center mb-10 md:mb-16">
            <SectionHeader icon={HeartPulse} title="A Calm Mind Learns Better" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
              We believe that you learn best when your mind is relaxed. Our simple approach makes sure you're mentally ready before testing what you know.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12">
            <div className="card-glass p-6 md:p-8 card-hover">
              <div className="w-12 h-12 bg-learnzy-purple/10 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-learnzy-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Before Your Test</h3>
              <p className="text-muted-foreground mb-4">
                Before every test, we help you calm your mind with simple activities to reduce worry and improve focus.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
                  <span>Easy breathing exercises to calm your nerves</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
                  <span>Positive statements to boost your confidence</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
                  <span>Short mindfulness to help you focus better</span>
                </li>
              </ul>
            </div>
            
            <div className="card-glass p-6 md:p-8 card-hover">
              <div className="w-12 h-12 bg-learnzy-blue/10 rounded-xl flex items-center justify-center mb-4">
                <BrainCircuit className="w-6 h-6 text-learnzy-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Learning Check</h3>
              <p className="text-muted-foreground mb-4">
                Our tests check both what you know and how you think to give you better insights.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
                  <span>Full subject knowledge testing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
                  <span>Understanding of your learning style</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
                  <span>Tracking how you feel during tests</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Analytics Section */}
        <section className="py-12 md:py-16 relative">
          {/* Background Element */}
          <div className="absolute top-40 right-0 opacity-5 w-72 h-72">
            <BarChart className="w-full h-full text-blue-400" />
          </div>
          
          <div className="text-center mb-10 md:mb-16">
            <SectionHeader icon={BarChart} title="Smart Analysis Made Simple" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
              We break down your test results into easy-to-understand charts and suggestions to help you improve.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-glass p-6 card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <BrainCircuit className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Subject Breakdown</h3>
              <p className="text-muted-foreground">
                See which topics you're good at and which ones need more work with simple, colorful charts.
              </p>
            </div>
            
            <div className="card-glass p-6 card-hover">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mind Check</h3>
              <p className="text-muted-foreground">
                Understand how your confidence, stress, and focus affect your test results and learn to improve.
              </p>
            </div>
            
            <div className="card-glass p-6 card-hover">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Plan</h3>
              <p className="text-muted-foreground">
                Get a simple list of what to study next based on your test results, with links to helpful resources.
              </p>
            </div>
          </div>
          
          <div className="mt-10 p-6 card-glass bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <h3 className="text-xl font-semibold mb-3">See How Your Brain Works</h3>
                <p className="text-muted-foreground mb-4">
                  Our smart tools don't just check your answers. They also show you:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>How fast you solve different types of problems</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Which concepts you connect well and which you struggle with</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>How your confidence affects your performance</span>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 bg-white p-4 rounded-xl border border-gray-100 shadow-subtle">
                <img 
                  src="/placeholder.svg" 
                  alt="Analytics visualization" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 md:py-16 relative">
          <div className="text-center mb-10 md:mb-16">
            <SectionHeader icon={Medal} title="Why Students Love Learnzy" />
            <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
              Our special approach combines test-taking with mental wellness to help you do your best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card-glass p-6 card-hover">
              <div className="w-12 h-12 bg-learnzy-purple/10 rounded-xl flex items-center justify-center mb-4">
                <BrainCircuit className="w-6 h-6 text-learnzy-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Testing</h3>
              <p className="text-muted-foreground">
                Subject-specific tests that show exactly what you need to work on.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card-glass p-6 card-hover">
              <div className="w-12 h-12 bg-learnzy-blue/10 rounded-xl flex items-center justify-center mb-4">
                <HeartPulse className="w-6 h-6 text-learnzy-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mind Care</h3>
              <p className="text-muted-foreground">
                Activities before tests to make sure you're in the right mindset to do well.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card-glass p-6 card-hover">
              <div className="w-12 h-12 bg-learnzy-teal/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-learnzy-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Tips</h3>
              <p className="text-muted-foreground">
                Custom study plans based on your test results to guide what to study next.
              </p>
            </div>
          </div>
        </section>
        
        {/* Testimonial/CTA Section */}
        <section className="py-12 md:py-16">
          <div className="card-glass p-6 md:p-10 lg:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6">
              Ready to Find Your Strengths?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-10">
              Join thousands of students who use Learnzy to find what they need to work on and improve their exam scores.
            </p>
            <Link to="/subjects" className="button-primary inline-flex">
              Start Your Learning Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
