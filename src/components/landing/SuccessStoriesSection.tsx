
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SuccessStoriesSection: React.FC = () => {
  return (
    <section className="py-6 md:py-8 bg-gradient-to-r from-white to-amber-50 rounded-xl mb-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-learnzy-dark">Success Stories</h2>
          <p className="text-xl font-bold text-amber-700 bg-amber-100 px-4 py-2 rounded-lg inline-block shadow-sm mb-4">
            Backed by AIIMS Topper
          </p>
          <p className="text-muted-foreground font-semibold text-amber-600">What NEET and JEE 2023 Toppers Have to Say</p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="aspect-video bg-white shadow-lg rounded-xl overflow-hidden border border-amber-100 mb-8">
            <iframe 
              className="w-full h-full"
              src="https://youtube.com/embed/shorts/oloiXicHd8s?si=M62KuY7EM20o9A7J" 
              title="NEET toppers sharing their success stories"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <div className="aspect-video bg-white shadow-lg rounded-xl overflow-hidden border border-amber-100">
            <iframe 
              className="w-full h-full"
              src="https://youtube.com/embed/SI2ce_6Qob4?cc_load_policy=0&cc_lang_pref=hi&hl=hi" 
              title="NEET toppers sharing their success stories in Hindi"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-4xl font-bold text-amber-500 mb-3">104+</h3>
            <p className="text-learnzy-dark font-medium">students scored 150+ in Physics</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-4xl font-bold text-amber-500 mb-3">62K+</h3>
            <p className="text-learnzy-dark font-medium">active users</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-4xl font-bold text-amber-500 mb-3">9279</h3>
            <p className="text-learnzy-dark font-medium">enrolled in test series</p>
          </div>
        </div>
        
        <div className="text-center">
          <Link
            to="/subjects"
            className="button-primary inline-flex items-center group"
          >
            Start a Free Test 
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
