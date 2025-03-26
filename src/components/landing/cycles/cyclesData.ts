
import { Book, ArrowRight, Shield, Star } from 'lucide-react';
import React from 'react';

export interface CycleData {
  number: number;
  title: string;
  focus: string;
  testDescription: string;
  icon: React.ReactNode;
  info: string;
}

// This function is needed to properly initialize the icons as JSX elements
export const getCyclesData = (): CycleData[] => [
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
