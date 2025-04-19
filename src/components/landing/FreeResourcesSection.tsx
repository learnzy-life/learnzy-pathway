
import { BookOpen } from 'lucide-react';
import React from 'react';

const FreeResourcesSection: React.FC = () => {
  return (
    <section className="mb-16 w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-learnzy-dark mb-2">Free Resources Worth ₹5000</h3>
        <p className="text-sm text-muted-foreground">Unlock premium study materials to boost your NEET preparation</p>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg border border-amber-100 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start p-3 bg-white rounded-md border border-amber-100 shadow-sm text-left">
            <BookOpen className="w-5 h-5 text-amber-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-learnzy-dark text-sm">Toppers' Highlighted NCERT</h4>
              <p className="text-muted-foreground text-xs">Class 11 & 12 annotated with important points</p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-white rounded-md border border-amber-100 shadow-sm text-left">
            <BookOpen className="w-5 h-5 text-amber-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-learnzy-dark text-sm">Physics Derived PYQs</h4>
              <p className="text-muted-foreground text-xs">10 similar NEET 2024 questions with solutions</p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-white rounded-md border border-amber-100 shadow-sm text-left">
            <BookOpen className="w-5 h-5 text-amber-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-learnzy-dark text-sm">Physics Formula Book</h4>
              <p className="text-muted-foreground text-xs">Complete formula guide for quick revision</p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-white rounded-md border border-amber-100 shadow-sm text-left">
            <BookOpen className="w-5 h-5 text-amber-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-learnzy-dark text-sm">Chemistry One-Page Notes</h4>
              <p className="text-muted-foreground text-xs">Quick revision guide for key concepts</p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-white rounded-md border border-amber-100 shadow-sm col-span-1 sm:col-span-2 text-left">
            <BookOpen className="w-5 h-5 text-amber-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-learnzy-dark text-sm">Top 50 Important Topics</h4>
              <p className="text-muted-foreground text-xs">For Botany, Zoology, Physics & Chemistry - handpicked by experts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeResourcesSection;
