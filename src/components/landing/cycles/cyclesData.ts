
import { Brain, Book, CheckCircle, Target } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface CycleData {
  number: number;
  title: string;
  focus: string;
  testDescription: string;
  icon: LucideIcon;
  goal: string;
}

export const getCyclesData = (): CycleData[] => {
  return [
    {
      number: 1,
      title: "Foundation",
      focus: "Core knowledge and concepts",
      testDescription: "4 topic-based tests + 1 personalized test",
      icon: Book,
      goal: "Master fundamentals"
    },
    {
      number: 2,
      title: "Improvement",
      focus: "Strengthen weak areas identified in Cycle 1",
      testDescription: "4 topic-based tests + 1 personalized test",
      icon: Brain,
      goal: "Build confidence"
    },
    {
      number: 3,
      title: "Advanced",
      focus: "Higher-level application and NCERT extra",
      testDescription: "4 topic-based tests + 1 personalized test",
      icon: CheckCircle,
      goal: "Deepen understanding"
    },
    {
      number: 4,
      title: "Mastery",
      focus: "Full-length tests with previous years' questions",
      testDescription: "4 topic-based tests + 1 personalized test",
      icon: Target,
      goal: "Achieve exam readiness"
    }
  ];
};
