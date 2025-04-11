
import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const CtaSection = () => {
  const { user, isDevelopmentBypass } = useAuth();
  const navigate = useNavigate();
  
  // Calculate days until NEET 2025 (assuming May 5, 2025)
  const neetDate = new Date(2025, 4, 5); // May 5, 2025
  const today = new Date();
  const daysUntilNeet = Math.ceil((neetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const handleDiagnosticClick = (e: React.MouseEvent) => {
    // If user is not authenticated, redirect to auth page
    if (!user && !isDevelopmentBypass) {
      e.preventDefault();
      toast.info('Please log in to take a diagnostic test');
      navigate('/auth', { state: { from: '/subjects' } });
    }
  };
  
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-amber-50 to-learnzy-purple/5 rounded-t-3xl">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-learnzy-dark mb-4">
          Ready to Excel in NEET 2025?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Join thousands of aspiring medical students who are transforming their NEET preparation with our unique combination of diagnostics, analytics, and mental wellness.
        </p>
        
        {/* Countdown Timer */}
        <div className="flex items-center justify-center mb-8 text-amber-800">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-medium">{daysUntilNeet} days left until NEET 2025</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {user || isDevelopmentBypass ? (
            <Link
              to="/subjects"
              className="button-primary inline-flex items-center"
            >
              Start Your Diagnostic Test <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          ) : (
            <button
              onClick={handleDiagnosticClick}
              className="button-primary inline-flex items-center"
            >
              Start Your Diagnostic Test <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          )}
          
          <Link
            to="/learn-more"
            className="button-secondary inline-flex items-center"
          >
            Explore Features <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        
        {/* Social Proof Statement */}
        <div className="bg-white p-4 md:p-6 rounded-xl max-w-2xl mx-auto shadow-sm">
          <p className="text-learnzy-dark">
            <span className="font-semibold text-learnzy-purple">93% of students</span> report feeling more confident about NEET after using Learnzy's integrated approach.
          </p>
          
          <div className="mt-4 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="ml-1 text-gray-600">(500+ reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
