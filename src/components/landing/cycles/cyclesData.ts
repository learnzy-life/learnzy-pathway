
import { Book, ArrowRight, Shield, Star } from 'lucide-react';
import React from 'react';

export interface CycleData {
  number: number;
  title: string;
  focus: string;
  goal: string;
  testDescription: string;
  icon: React.ReactNode;
  info: string;
}

// This function is needed to properly initialize the icons as React elements
export const getCyclesData = (): CycleData[] => [
  {
    number: 1,
    title: "Foundation Building",
    focus: "Master high-yield topics confirmed in the NEET exam",
    goal: "Build strength in these areas to avoid losing marks",
    testDescription: "4 tests on key topics + 1 to fix weak spots",
    icon: React.createElement(Book, { className: "w-4 h-4 text-learnzy-amber" }),
    info: "First phase of preparation focusing on high-yield topics to build a strong foundation for NEET."
  },
  {
    number: 2,
    title: "Conceptual Depth",
    focus: "Tackle moderate and fundamentally important topics, including conceptual and slightly challenging questions",
    goal: "Deepen understanding and prepare for varied question types",
    testDescription: "4 tests to build skills + 1 on tough topics",
    icon: React.createElement(ArrowRight, { className: "w-4 h-4 text-learnzy-amber" }),
    info: "Second phase aimed at deepening conceptual understanding and expanding problem-solving skills."
  },
  {
    number: 3,
    title: "Improvement Boost",
    focus: "Bridge gaps and enhance performance",
    goal: "Expect a noticeable marks improvement after this cycle",
    testDescription: "4 tests to solidify + 1 to sharpen weak points",
    icon: React.createElement(Shield, { className: "w-4 h-4 text-learnzy-amber" }),
    info: "Third phase dedicated to addressing performance gaps and boosting overall exam readiness."
  },
  {
    number: 4,
    title: "Real Exam Simulation",
    focus: "Replicate the NEET 2025 exam environment with real-like mocks",
    goal: "Give students the exact feel of the actual exam",
    testDescription: "4 NEET-style tests + 1 final weak-spot check",
    icon: React.createElement(Star, { className: "w-4 h-4 text-learnzy-amber" }),
    info: "Final phase simulating the exact NEET exam experience to build ultimate confidence and preparedness."
  }
];

