
import React from 'react';
import { Button } from "@/components/ui/button";
import { CycleData } from '../landing/cycles/cyclesData';
import { Lock } from 'lucide-react';

interface CycleInfoProps {
  cycle: CycleData;
  isUnlocked: boolean;
  onUnlockClick: () => void;
}

const CycleInfo: React.FC<CycleInfoProps> = ({ cycle, isUnlocked, onUnlockClick }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-learnzy-amber/10 mb-6">
      <h3 className="font-semibold text-lg text-learnzy-dark mb-1">Cycle {cycle.number}: {cycle.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{cycle.focus}</p>
      <p className="text-xs text-muted-foreground">{cycle.info}</p>
      
      {cycle.number > 1 && !isUnlocked && (
        <div className="mt-3 pt-3 border-t border-dashed border-amber-200">
          <Button 
            onClick={onUnlockClick}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
            size="sm"
          >
            <Lock className="w-4 h-4" />
            Unlock Cycle {cycle.number} (₹499)
          </Button>
        </div>
      )}
    </div>
  );
};

export default CycleInfo;
