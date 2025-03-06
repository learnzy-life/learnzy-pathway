
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CtaSection = () => {
  const { user } = useAuth();
  
  return (
    <section className="py-20 bg-learnzy-purple/5">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-learnzy-dark mb-4">
          Ready to Revolutionize Your Test Prep?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
          Join thousands of students who are transforming their study habits and achieving better results with our innovative approach.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {user ? (
            <>
              <Link
                to="/subjects"
                className="button-primary inline-flex items-center"
              >
                Take a Practice Test <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                to="/dashboard"
                className="button-secondary inline-flex items-center"
              >
                View Your Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="button-primary inline-flex items-center"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                to="/learn-more"
                className="button-secondary inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
