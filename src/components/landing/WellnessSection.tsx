
import { BrainCircuit, CheckCircle, HeartPulse, Sparkles } from 'lucide-react'
import React from 'react'
import SectionHeader from '../SectionHeader'

const WellnessSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16 relative px-3 sm:px-0">
      {/* Background Element */}
      <div className="absolute bottom-20 left-0 opacity-5 w-48 md:w-72 h-48 md:h-72 -rotate-12">
        <HeartPulse className="w-full h-full text-red-400" />
      </div>

      <div className="text-center mb-8 md:mb-16">
        <SectionHeader icon={HeartPulse} title="A Calm Mind Excels in NEET" />
        <p className="text-muted-foreground max-w-2xl mx-auto mt-3 px-2 sm:px-0">
          We believe that NEET success requires both knowledge and mental balance. Our integrated 
          approach ensures you're mentally prepared before every diagnostic test.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mb-10 md:mb-12">
        <div className="card-glass p-5 md:p-8 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-purple/10 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-learnzy-purple" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
            Pre-Test Mental Preparation
          </h3>
          <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
            Before each NEET diagnostic test, we help you calm your mind with proven techniques 
            to reduce anxiety and improve focus - essential for peak performance.
          </p>
          <ul className="space-y-2 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Science-backed breathing exercises to reduce test anxiety</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>NEET-focused positive affirmations to boost confidence</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Brief mindfulness practices for enhanced concentration</span>
            </li>
          </ul>
        </div>

        <div className="card-glass p-5 md:p-8 card-hover">
          <div className="w-10 md:w-12 h-10 md:h-12 bg-learnzy-blue/10 rounded-xl flex items-center justify-center mb-3 md:mb-4">
            <BrainCircuit className="w-5 md:w-6 h-5 md:h-6 text-learnzy-blue" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
            Comprehensive NEET Assessment
          </h3>
          <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
            Our diagnostic tests don't just evaluate your subject knowledge - they analyze how you think 
            and approach problems, giving you deeper insights into your NEET readiness.
          </p>
          <ul className="space-y-2 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Complete subject knowledge mapping for Biology, Physics & Chemistry</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Analysis of your unique learning patterns and approach</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-learnzy-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>Correlation between emotional state and test performance</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* NEET-specific callout */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 text-center max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">Did you know?</h3>
        <p className="text-amber-700">
          Studies show that students who manage test anxiety effectively score up to 15% higher on entrance exams like NEET. 
          Our integrated approach helps you manage stress while mastering the concepts.
        </p>
      </div>
    </section>
  )
}

export default WellnessSection
