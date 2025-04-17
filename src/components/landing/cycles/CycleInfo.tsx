
import React from 'react';
import { Book, ArrowRight, Shield, Star } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface CycleInfoProps {
  number: number;
  title: string;
  description: string;
  goal?: string;
}

const CycleInfo: React.FC<CycleInfoProps> = ({ number, title, description, goal }) => {
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
        <p className="text-sm mb-2">{description}</p>
        {goal && (
          <div className="mt-2 pt-2 border-t border-learnzy-amber/20">
            <p className="text-xs font-medium text-learnzy-amber-dark">
              🎯 Goal: {goal}
            </p>
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export default CycleInfo;
