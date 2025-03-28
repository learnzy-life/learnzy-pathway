
import React from 'react';
import { Book } from 'lucide-react';

const DynamicTestInfoCard = () => {
  return (
    <div className="mt-16 p-6 bg-amber-50 rounded-lg border border-amber-100">
      <div className="flex">
        <Book className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
        <div className="text-left">
          <h3 className="font-semibold text-amber-800 mb-2">About AI-Powered Tests</h3>
          <p className="text-amber-700 text-sm">
            This specially crafted test focuses on your weak areas from the previous 4 tests in this cycle.
            It contains 45 questions each from Physics and Chemistry, and 90 from Biology, just like your
            regular tests, but targeted to help you improve where you need it most.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicTestInfoCard;
