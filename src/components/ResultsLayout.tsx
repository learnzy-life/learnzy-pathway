
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Header from './Header';
import { toast } from 'sonner';

interface ResultsLayoutProps {
  children: React.ReactNode;
  subjectTitle: string;
}

const ResultsLayout: React.FC<ResultsLayoutProps> = ({ children, subjectTitle }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;

    try {
      toast.info("Preparing your PDF...");

      const content = contentRef.current;
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${subjectTitle.toLowerCase().replace(/\s+/g, '-')}-test-results.pdf`);
      
      toast.success("Download complete!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download results. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-16">
        <section className="py-6 sm:py-8 max-w-5xl mx-auto">
          <Link to="/subjects" className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-6 sm:mb-8 transition-colors duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Subjects
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-10">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2">
                {subjectTitle} Test Results
              </h1>
              <p className="text-muted-foreground">
                Great job completing your diagnostic test! Here's a detailed breakdown of your performance.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button 
                className="button-secondary text-sm sm:text-base py-2 px-4 sm:px-6 flex items-center"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" /> Download
              </button>
              <button className="button-secondary text-sm sm:text-base py-2 px-4 sm:px-6">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </button>
            </div>
          </div>
          
          <div ref={contentRef}>
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResultsLayout;
