
import React from 'react';
import { ArrowRight, Book, Brain, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const BriefCyclesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 mb-16 bg-[#FFF9E6] rounded-xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Your Path to NEET Success</h2>
          <p className="text-muted-foreground">Our proven 4-cycle approach to ace the NEET exam</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[1, 2, 3, 4].map((cycle) => (
              <div 
                key={cycle} 
                className="w-full sm:w-[calc(50%-1rem)] md:w-48 bg-white rounded-xl shadow-sm border border-amber-100 p-4 text-center"
              >
                <div className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-amber-100 mb-3">
                  <span className="text-amber-600 font-bold">{cycle}</span>
                </div>
                <h3 className="font-semibold text-learnzy-dark mb-1">Cycle {cycle}</h3>
                <p className="text-sm text-muted-foreground">
                  {cycle === 1 ? 'Foundation' : 
                   cycle === 2 ? 'Improvement' : 
                   cycle === 3 ? 'Advanced' : 'Mastery'}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-white border border-learnzy-amber/30 rounded-lg p-5 shadow-sm mb-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-amber-100 p-2 rounded-full">
                <Target className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-learnzy-dark mb-2">Our Key Advantage</h4>
                <p className="text-[#333333] font-medium mb-2">
                  Every cycle ends with a test tailored to your weak areas—so you improve fast.
                </p>
                <div className="bg-amber-50 p-3 rounded-md border border-learnzy-amber/20 mt-3">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-learnzy-dark">
                        <span className="font-semibold">How it works:</span> Our AI analyzes your performance and creates a personalized test that focuses on your weak areas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/subjects"
              className="button-primary inline-flex items-center"
            >
              Learn More About Cycles <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BriefCyclesSection;
