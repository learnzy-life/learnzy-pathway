
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import Header from './Header';

interface ResultsLayoutProps {
  children: React.ReactNode;
  subjectTitle: string;
}

const ResultsLayout: React.FC<ResultsLayoutProps> = ({ children, subjectTitle }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <section className="py-8 max-w-5xl mx-auto">
          <Link to="/subjects" className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-8 transition-colors duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subjects
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {subjectTitle} Test Results
              </h1>
              <p className="text-muted-foreground">
                Great job completing your diagnostic test! Here's a detailed breakdown of your performance.
              </p>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="button-secondary flex items-center">
                <Download className="w-4 h-4 mr-2" /> Download
              </button>
              <button className="button-secondary flex items-center">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </button>
            </div>
          </div>
          
          {children}
        </section>
      </main>
    </div>
  );
};

export default ResultsLayout;
