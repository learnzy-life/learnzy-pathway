
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
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
      toast.info("Preparing your interactive report...");
      
      // Get the content
      const content = contentRef.current;
      
      // Clone the styles
      let styles = '';
      document.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => {
        if (el instanceof HTMLStyleElement) {
          styles += el.outerHTML;
        } else if (el instanceof HTMLLinkElement) {
          styles += el.outerHTML;
        }
      });
      
      // Create an HTML document
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subjectTitle} Test Results</title>
          ${styles}
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 2rem;
              background-color: #f5f5f7;
            }
            .results-container {
              max-width: 1200px;
              margin: 0 auto;
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              padding: 2rem;
            }
            h1 {
              color: #333;
              font-size: 2rem;
              margin-bottom: 1rem;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2rem;
              border-bottom: 1px solid #eee;
              padding-bottom: 1rem;
            }
            .learnzy-brand {
              font-weight: bold;
              font-size: 1.5rem;
              color: #9b87f5;
            }
          </style>
        </head>
        <body>
          <div class="results-container">
            <div class="header">
              <div class="learnzy-brand">Learnzy</div>
              <div>Generated on ${new Date().toLocaleDateString()}</div>
            </div>
            <h1>${subjectTitle} Test Results</h1>
            ${content.innerHTML}
          </div>
          <script>
            // Add any interactive JavaScript here
            document.addEventListener('DOMContentLoaded', function() {
              console.log('Interactive report loaded');
              // Any charts or interactive elements can be initialized here
            });
          </script>
        </body>
        </html>
      `;
      
      // Create a blob and download it
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${subjectTitle.toLowerCase().replace(/\s+/g, '-')}-test-results.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      toast.success("Download complete! Open the HTML file in your browser for an interactive report.");
    } catch (error) {
      console.error("Error generating report:", error);
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
              <button className="button-secondary text-sm sm:text-base py-2 px-4 sm:px-6 flex items-center">
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
