
import { ArrowRight, Brain, CheckCircle, BookOpen, Heart } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const WhyLearnzySection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 mb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Why Learnzy?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="w-10 h-10 bg-learnzy-purple/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-learnzy-purple" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-learnzy-dark">New platform, proven expertise</h3>
              <p className="text-muted-foreground">Built by Kota's top educators with over 20 years of experience</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="w-10 h-10 bg-learnzy-purple/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-learnzy-purple" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-learnzy-dark">Handpicked questions</h3>
              <p className="text-muted-foreground">PYQs, derived PYQs, NCERT-based, and exclusive Kota-crafted problems</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="w-10 h-10 bg-learnzy-purple/10 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-learnzy-purple" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-learnzy-dark">Mental wellness tools</h3>
              <p className="text-muted-foreground">Deep breathing exercises, emoji-based mood check-in, and active affirmations</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="mr-4 mt-1">
              <div className="w-10 h-10 bg-learnzy-purple/10 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-learnzy-purple" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-learnzy-dark">AI-powered insights</h3>
              <p className="text-muted-foreground">Targeted recommendations to improve your weaker areas</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link
            to="/subjects"
            className="button-primary inline-flex items-center"
          >
            Start a Free Test <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyLearnzySection;
