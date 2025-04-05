import { ArrowLeft, Download, Share2 } from 'lucide-react'
import React, { useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import Header from './Header'

interface ResultsLayoutProps {
  children: React.ReactNode
  subjectTitle: string
}

const ResultsLayout: React.FC<ResultsLayoutProps> = ({
  children,
  subjectTitle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams()
  const isMockTest = searchParams.get('mock') === 'true'
  const testNumber = searchParams.get('testNumber') || ''
  const isDynamicTest = isMockTest && testNumber === '5'

  // Determine the appropriate test type text
  const getTestTypeText = () => {
    if (isDynamicTest) {
      return 'personalized test'
    } else if (isMockTest) {
      return 'mock test'
    } else {
      return 'diagnostic test'
    }
  }

  const handleDownload = async () => {
    if (!contentRef.current) return

    try {
      toast.info('Preparing your interactive report...')

      // Get the content
      const content = contentRef.current

      // Clone the styles
      let styles = ''
      document
        .querySelectorAll('style, link[rel="stylesheet"]')
        .forEach((el) => {
          if (el instanceof HTMLStyleElement) {
            styles += el.outerHTML
          } else if (el instanceof HTMLLinkElement) {
            styles += el.outerHTML
          }
        })

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
              padding: 1rem;
              background-color: #f5f5f7;
            }
            .results-container {
              max-width: 1200px;
              margin: 0 auto;
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              padding: 1.5rem;
            }
            h1 {
              color: #333;
              font-size: 1.5rem;
              margin-bottom: 1rem;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 1.5rem;
              border-bottom: 1px solid #eee;
              padding-bottom: 1rem;
            }
            .learnzy-brand {
              font-weight: bold;
              font-size: 1.25rem;
              color: #9b87f5;
            }
            @media (min-width: 640px) {
              body {
                padding: 2rem;
              }
              .results-container {
                padding: 2rem;
              }
              h1 {
                font-size: 2rem;
              }
              .learnzy-brand {
                font-size: 1.5rem;
              }
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
      `

      // Create a blob and download it
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `${subjectTitle
        .toLowerCase()
        .replace(/\s+/g, '-')}-test-results.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100)

      toast.success(
        'Download complete! Open the HTML file in your browser for an interactive report.'
      )
    } catch (error) {
      console.error('Error generating report:', error)
      toast.error('Failed to download results. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-3 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16">
        <section className="py-4 sm:py-8 max-w-5xl mx-auto">
          <Link
            to="/subjects"
            className="flex items-center text-muted-foreground hover:text-learnzy-dark mb-4 sm:mb-8 transition-colors duration-200 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" /> Back to Subjects
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-10">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-display font-bold mb-1 sm:mb-2">
                {subjectTitle} Test Results
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Great job completing your {getTestTypeText()}! Here's a detailed
                breakdown of your performance.
              </p>
            </div>

            <div className="flex space-x-2 sm:space-x-3">
              <button
                className="button-secondary text-xs sm:text-base py-1.5 sm:py-2 px-2 sm:px-6 flex items-center"
                onClick={handleDownload}
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />{' '}
                Download
              </button>
              <button className="button-secondary text-xs sm:text-base py-1.5 sm:py-2 px-2 sm:px-6 flex items-center">
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />{' '}
                Share
              </button>
            </div>
          </div>

          <div ref={contentRef}>{children}</div>
        </section>
      </main>
    </div>
  )
}

export default ResultsLayout
