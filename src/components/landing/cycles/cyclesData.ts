
import { Book, ArrowRight, Shield, Star } from 'lucide-react';
import React from 'react';

export interface CycleData {
  number: number;
  title: string;
  focus: string;
  testDescription: string;
  icon: React.ReactNode;
  info: string;
  goal: string;
}

// This function is needed to properly initialize the icons as React elements
export const getCyclesData = (): CycleData[] => [
  {
    number: 1,
    title: "Foundation Building",
    focus: "Master high-yield topics confirmed in the NEET exam",
    testDescription: "4 tests on key topics + 1 to fix weak spots",
    icon: React.createElement(Book, { className: "w-4 h-4 text-learnzy-amber" }),
    info: "Master the basics with 4 tests on key topics + 1 AI-powered test to fix weak spots.",
    goal: "Build strength in these areas to avoid losing marks."
  },
  {
    number: 2,
    title: "Conceptual Depth",
    focus: "Tackle moderate and fundamentally important topics",
    testDescription: "4 tests to build skills + 1 on tough topics",
    icon: React.createElement(ArrowRight, { className: "w-4 h-4 text-learnzy-amber" }),
    info: "Strengthen weak areas with 4 tests on tough topics + 1 AI-powered test to boost accuracy.",
    goal: "Deepen understanding and prepare for varied question types."
  },
  {
    number: 3,
    title: "Improvement Boost",
    focus: "Bridge gaps and enhance performance",
    testDescription: "4 tests to solidify + 1 to sharpen weak points",
    icon: React.createElement(Shield, { className: "w-4 h-4 text-learnzy-amber" }),
    info: "Boost confidence with 4 tests on advanced skills + 1 AI-powered test to refine strengths.",
    goal: "Expect a noticeable marks improvement after this cycle."
  },
  {
    number: 4,
    title: "Real Exam Simulation",
    focus: "Replicate the NEET 2025 exam environment",
    testDescription: "4 NEET-style tests + 1 final weak-spot check",
    icon: React.createElement(Star, { className: "w-4 h-4 text-learnzy-amber" }),
    info: "Simulate the real NEET with 4 full tests + 1 AI-powered test for final prep.",
    goal: "Experience the exact feel of the actual exam."
  }
];
