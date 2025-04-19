
import { ArrowRight, Youtube } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const SuccessStoriesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-white to-amber-50 rounded-xl mb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Success Stories</h2>
          <p className="text-muted-foreground">What NEET and JEE 2023 Toppers Have to Say</p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-10">
          <div className="aspect-video bg-white shadow-sm rounded-xl overflow-hidden">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/YaTK7D38C3E" 
              title="NEET toppers sharing their success stories"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100">
            <h3 className="text-3xl font-bold text-amber-500 mb-2">104+</h3>
            <p className="text-learnzy-dark">students scored 150+ in Physics</p>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100">
            <h3 className="text-3xl font-bold text-amber-500 mb-2">62K+</h3>
            <p className="text-learnzy-dark">active users</p>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100">
            <h3 className="text-3xl font-bold text-amber-500 mb-2">9279</h3>
            <p className="text-learnzy-dark">enrolled in test series</p>
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

export default SuccessStoriesSection;
