
import React, { useState } from 'react';
import { Book, ArrowRight, Shield, Star, Brain, Info } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import { Card } from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CycleCardProps {
  number: number;
  title: string;
  focus: string;
  testDescription: string;
  icon: React.ReactNode;
}

const CycleCard: React.FC<CycleCardProps> = ({ 
  number, 
  title, 
  focus, 
  testDescription, 
  icon 
}) => {
  return (
    <Card className="bg-white border border-learnzy-amber/30 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className="relative p-4 sm:p-5 h-full">
        <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-learnzy-amber flex items-center justify-center text-white font-semibold text-sm">
          {number}
        </div>
        <div className="mb-3 pt-1 flex items-center">
          <div className="w-8 h-8 bg-learnzy-amber-light rounded-full flex items-center justify-center mr-2">
            {icon}
          </div>
          <h3 className="font-semibold text-lg text-[#003366]">{title}</h3>
        </div>
        <p className="text-[#003366] font-medium mb-2">{focus}</p>
        <div className="flex items-start">
          <p className="text-sm text-[#003366]/80">{testDescription}</p>
          <div className="ml-1 bg-learnzy-amber/20 px-1 rounded text-xs flex items-center">
            <Brain className="w-3 h-3 text-learnzy-amber-dark mr-1" />
            <span className="text-learnzy-amber-dark font-medium">AI</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface CycleInfoProps {
  number: number;
  title: string;
  description: string;
}

const CycleInfo: React.FC<CycleInfoProps> = ({ number, title, description }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="w-12 h-12 rounded-full bg-white border-2 border-learnzy-amber flex items-center justify-center mb-2 hover:bg-learnzy-amber-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-learnzy-amber/50">
          {number === 1 && <Book className="w-5 h-5 text-learnzy-amber" />}
          {number === 2 && <ArrowRight className="w-5 h-5 text-learnzy-amber" />}
          {number === 3 && <Shield className="w-5 h-5 text-learnzy-amber" />}
          {number === 4 && <Star className="w-5 h-5 text-learnzy-amber" />}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-white text-[#003366] border border-learnzy-amber/20 p-3 max-w-xs shadow-md">
        <div className="font-semibold mb-1">{title}</div>
        <p className="text-sm">{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const MockTestCyclesSection: React.FC = () => {
  const cycles = [
    {
      number: 1,
      title: "Foundation",
      focus: "Master the basics",
      testDescription: "4 tests on key topics + 1 to fix weak spots",
      icon: <Book className="w-4 h-4 text-learnzy-amber" />,
      info: "Master the basics with 4 tests on key topics + 1 AI-powered test to fix weak spots."
    },
    {
      number: 2,
      title: "Bridging Gaps",
      focus: "Strengthen weak areas",
      testDescription: "4 tests to build skills + 1 on tough topics",
      icon: <ArrowRight className="w-4 h-4 text-learnzy-amber" />,
      info: "Strengthen weak areas with 4 tests on tough topics + 1 AI-powered test to boost accuracy."
    },
    {
      number: 3,
      title: "Reinforcement",
      focus: "Boost confidence",
      testDescription: "4 tests to solidify + 1 to sharpen weak points",
      icon: <Shield className="w-4 h-4 text-learnzy-amber" />,
      info: "Boost confidence with 4 tests on advanced skills + 1 AI-powered test to refine strengths."
    },
    {
      number: 4,
      title: "NEET Readiness",
      focus: "Feel exam-ready",
      testDescription: "4 NEET-style tests + 1 final weak-spot check",
      icon: <Star className="w-4 h-4 text-learnzy-amber" />,
      info: "Simulate the real NEET with 4 full tests + 1 AI-powered test for final prep."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-[#FFF9E6] rounded-xl overflow-hidden my-8 md:my-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <SectionHeader 
            icon={Book} 
            title="Your Path to NEET Success: 4 Mock Test Cycles" 
          />
          <p className="text-[#333333] max-w-3xl mx-auto mt-3 px-2 sm:px-0 font-medium">
            Get NEET 2025-ready with 20 mock tests split into 4 cycles. Each builds your skills, step by step.
          </p>
        </div>

        {/* Cycle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {cycles.map((cycle) => (
            <CycleCard 
              key={cycle.number}
              number={cycle.number}
              title={`Cycle ${cycle.number}: ${cycle.title}`}
              focus={cycle.focus}
              testDescription={cycle.testDescription}
              icon={cycle.icon}
            />
          ))}
        </div>

        {/* Visual Path - Desktop */}
        <div className="hidden md:block relative max-w-4xl mx-auto mb-8 pt-4">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-learnzy-amber/30 transform -translate-y-1/2"></div>
          
          <div className="flex justify-between relative">
            {cycles.map((cycle, index) => (
              <CycleInfo 
                key={index}
                number={cycle.number}
                title={`Cycle ${cycle.number}: ${cycle.title}`}
                description={cycle.info}
              />
            ))}
          </div>
        </div>

        {/* Visual Path - Mobile */}
        <div className="md:hidden relative max-w-xs mx-auto mb-8">
          <div className="absolute top-0 bottom-0 left-6 w-1 bg-learnzy-amber/30"></div>
          
          <div className="flex flex-col space-y-8 relative">
            {cycles.map((cycle, index) => (
              <div key={index} className="flex items-center relative z-10">
                <CycleInfo 
                  number={cycle.number}
                  title={`Cycle ${cycle.number}: ${cycle.title}`}
                  description={cycle.info}
                />
                <span className="text-sm font-medium text-[#003366] ml-2">Cycle {cycle.number}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Extra Clarity */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-lg border border-learnzy-amber/20 shadow-sm mb-6">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Brain className="w-5 h-5 text-learnzy-amber" />
              </div>
              <div>
                <p className="text-[#333333] font-medium">
                  Every cycle ends with a test tailored to your weak areas—so you improve fast.
                </p>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <div className="text-center">
            <p className="text-[#333333] font-semibold text-lg">
              This simple plan gets you ready for NEET 2025!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockTestCyclesSection;
