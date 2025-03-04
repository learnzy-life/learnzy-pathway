
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SubmitWarningDialogProps {
  answeredCount: number;
  totalQuestions: number;
  onContinue: () => void;
  onSubmit: () => void;
}

const SubmitWarningDialog: React.FC<SubmitWarningDialogProps> = ({
  answeredCount,
  totalQuestions,
  onContinue,
  onSubmit
}) => {
  const percentAnswered = Math.round((answeredCount/totalQuestions)*100);
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-elevated animate-scale-in">
        <div className="flex items-start mb-4">
          <AlertCircle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
            <p className="text-muted-foreground mb-4">
              You've only answered {answeredCount} out of {totalQuestions} questions ({percentAnswered}%). 
              Unanswered questions will be marked as incorrect.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onContinue}
            className="button-secondary"
          >
            Continue Test
          </button>
          <button
            onClick={onSubmit}
            className="button-primary bg-red-600 hover:bg-red-700"
          >
            Submit Anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitWarningDialog;
