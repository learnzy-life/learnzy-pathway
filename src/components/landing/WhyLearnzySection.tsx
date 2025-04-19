
import { ArrowRight, Brain, CheckCircle, Book, Heart } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const WhyLearnzySection: React.FC = () => {
  return (
    <section className="py-8 md:py-12 mb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Why Learnzy?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
          {[
            {
              icon: Book,
              title: "New platform, proven expertise",
              desc: "Built by Kota's top educators with over 20 years of experience"
            },
            {
              icon: CheckCircle,
              title: "Handpicked questions",
              desc: "PYQs, derived PYQs, NCERT-based, and exclusive Kota-crafted problems"
            },
            {
              icon: Heart,
              title: "Mental wellness tools",
              desc: "Deep breathing exercises, emoji-based mood check-in, and active affirmations"
            },
            {
              icon: Brain,
              title: "AI-powered insights",
              desc: "Targeted recommendations to improve your weaker areas"
            }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start p-4 bg-white rounded-lg border border-amber-100 hover:border-learnzy-amber transition-colors">
              <div className="mr-3">
                <div className="w-8 h-8 bg-learnzy-amber/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-learnzy-amber" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1 text-learnzy-dark">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            to="/subjects"
            className="button-primary inline-flex items-center text-sm px-5 py-2"
          >
            Start a Free Test <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyLearnzySection;
