
import React from 'react';
import { Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';

export interface CycleCardProps {
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

export default CycleCard;
