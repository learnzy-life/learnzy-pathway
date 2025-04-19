
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BriefCyclesSection: React.FC = () => {
  return (
    <section className="py-8 md:py-12 mb-12 bg-[#FFF9E6] rounded-xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Your Path to NEET Success</h2>
          <p className="text-muted-foreground text-sm">Our proven 4-cycle approach</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { number: 1, title: 'Foundation', focus: 'Core concepts' },
              { number: 2, title: 'Improvement', focus: 'Strengthen weak areas' },
              { number: 3, title: 'Advanced', focus: 'Higher-level topics' },
              { number: 4, title: 'Mastery', focus: 'Full preparation' },
            ].map((cycle) => (
              <div 
                key={cycle.number} 
                className="bg-white rounded-lg shadow-sm border border-amber-100 p-3 text-center hover:border-learnzy-amber transition-colors"
              >
                <div className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-amber-100 mb-2">
                  <span className="text-amber-600 font-semibold text-sm">{cycle.number}</span>
                </div>
                <h3 className="font-semibold text-sm text-learnzy-dark mb-1">{cycle.title}</h3>
                <p className="text-xs text-muted-foreground">{cycle.focus}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/subjects"
              className="button-primary inline-flex items-center text-sm px-5 py-2"
            >
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BriefCyclesSection;
