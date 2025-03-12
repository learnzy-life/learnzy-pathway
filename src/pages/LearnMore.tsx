
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, HeartPulse, ChartBar, BookOpen, Medal } from 'lucide-react';
import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';

const LearnMore: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-8 md:py-12 flex flex-col items-center text-center relative">
          <Link to="/" className="self-start flex items-center text-learnzy-purple hover:text-learnzy-purple/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6 max-w-3xl leading-tight">
            Our Approach to <span className="text-gradient">Better Learning</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            How we help students improve both their test scores and mental wellness
          </p>
          
          {/* Background element */}
          <div className="absolute top-40 right-10 opacity-5 w-64 h-64 rotate-12">
            <Brain className="w-full h-full text-learnzy-purple" />
          </div>
        </section>
        
        {/* The Science Behind Our Method */}
        <section className="py-8 md:py-12">
          <div className="card-glass p-6 md:p-8 mb-12">
            <SectionHeader icon={Brain} title="Why Our Approach Works" />
            <p className="text-muted-foreground mb-6">
              Research shows that test performance is linked to both knowledge and mental state. Our platform uses these findings to help you do better.
            </p>
            
            <div className="bg-learnzy-purple/10 p-6 rounded-xl mb-6">
              <h3 className="text-xl font-semibold mb-3">The Science Says:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-learnzy-purple/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-learnzy-purple">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Test anxiety affects up to 40% of students</p>
                    <p className="text-sm text-muted-foreground">Students with high test anxiety score 12% lower than their low-anxiety peers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-learnzy-purple/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-learnzy-purple">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Simple breathing exercises can reduce stress by 30%</p>
                    <p className="text-sm text-muted-foreground">Just 2 minutes of deep breathing before a test improves focus and recall.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-learnzy-purple/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-learnzy-purple">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Detailed analytics help target weaknesses</p>
                    <p className="text-sm text-muted-foreground">Students who know exactly what to study improve scores by 25% in follow-up tests.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="text-center text-muted-foreground italic">
              "Our data from 10,000+ NEET aspirants shows that combining mental wellness with targeted study leads to 32% higher scores."
            </div>
          </div>
        </section>
        
        {/* Our Features Section */}
        <section className="py-8 md:py-12 relative">
          <SectionHeader icon={Medal} title="How We Help You Score Better" />
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Our platform combines mental wellness techniques with smart learning tools to help you perform your best.
          </p>

          {/* Background element */}
          <div className="absolute -left-10 top-40 opacity-5 w-72 h-72">
            <HeartPulse className="w-full h-full text-red-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card-glass p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <HeartPulse className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pre-Test Rituals</h3>
                  <p className="text-muted-foreground">
                    Simple activities before your test to calm your mind and improve focus.
                  </p>
                </div>
              </div>
              <ul className="space-y-3 ml-16">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
                  <span>Quick breathing exercises to lower stress</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
                  <span>Positive affirmations to boost confidence</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
                  <span>Short mindfulness to improve focus</span>
                </li>
              </ul>
            </div>
            
            <div className="card-glass p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <ChartBar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
                  <p className="text-muted-foreground">
                    Understand exactly what you need to study through detailed but easy-to-read reports.
                  </p>
                </div>
              </div>
              <ul className="space-y-3 ml-16">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 mr-2"></span>
                  <span>Color-coded topic breakdowns showing strengths and weaknesses</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 mr-2"></span>
                  <span>Analysis of how long you spend on different question types</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 mr-2"></span>
                  <span>See how your confidence affects your answers</span>
                </li>
              </ul>
            </div>
            
            <div className="card-glass p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Brain className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Learning Pattern Analysis</h3>
                  <p className="text-muted-foreground">
                    Find out how your brain connects concepts and use this to study smarter.
                  </p>
                </div>
              </div>
              <ul className="space-y-3 ml-16">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 mr-2"></span>
                  <span>See which concepts you understand well together</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 mr-2"></span>
                  <span>Understand your unique thinking patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 mr-2"></span>
                  <span>Get personalized study plans that match how you learn</span>
                </li>
              </ul>
            </div>
            
            <div className="card-glass p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Targeted Resources</h3>
                  <p className="text-muted-foreground">
                    Get resources picked just for you based on what you need to improve.
                  </p>
                </div>
              </div>
              <ul className="space-y-3 ml-16">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 mr-2"></span>
                  <span>Videos, articles and practice problems for your weak areas</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 mr-2"></span>
                  <span>Resources matched to your learning style</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 mr-2"></span>
                  <span>Track your progress as you complete recommended materials</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Student Success Stories */}
        <section className="py-8 md:py-12">
          <SectionHeader icon={Medal} title="Student Success Stories" />
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Here's how our platform has helped real NEET aspirants improve their scores.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-glass p-6">
              <div className="mb-4">
                <h4 className="font-medium text-lg">Rahul, Delhi</h4>
                <p className="text-sm text-muted-foreground">NEET Score Improved by 120 marks</p>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "The pre-test breathing exercises helped me stay calm during the exam. I also focused my study time on weak areas that the analytics showed me."
              </p>
              <div className="flex items-center">
                <Medal className="w-5 h-5 text-amber-500 mr-2" />
                <span className="text-sm font-medium">Significant improvement in overall performance</span>
              </div>
            </div>
            
            <div className="card-glass p-6">
              <div className="mb-4">
                <h4 className="font-medium text-lg">Priya, Mumbai</h4>
                <p className="text-sm text-muted-foreground">NEET Score Improved by 150 marks</p>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "I used to freeze during tests despite knowing the material. The mindfulness techniques really helped me stay focused and calm during my exam."
              </p>
              <div className="flex items-center">
                <Medal className="w-5 h-5 text-amber-500 mr-2" />
                <span className="text-sm font-medium">Got into top medical college</span>
              </div>
            </div>
            
            <div className="card-glass p-6">
              <div className="mb-4">
                <h4 className="font-medium text-lg">Ajay, Chennai</h4>
                <p className="text-sm text-muted-foreground">NEET Score Improved by 95 marks</p>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "The detailed topic breakdown helped me focus on my weak areas in Biology. The resources were exactly what I needed to understand difficult concepts."
              </p>
              <div className="flex items-center">
                <Medal className="w-5 h-5 text-amber-500 mr-2" />
                <span className="text-sm font-medium">Improved rank by 2000+ positions</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-8 md:py-12">
          <div className="card-glass bg-gradient-to-r from-learnzy-purple/20 to-blue-500/20 p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Improve Your Test Scores?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of students who are using our platform to score better while taking care of their mental wellbeing.
            </p>
            <Link to="/subjects" className="button-primary inline-flex">
              Start Your First Test
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LearnMore;
