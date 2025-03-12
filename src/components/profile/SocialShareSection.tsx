
import React from 'react'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface SocialShareSectionProps {
  sharedCount: number
  incrementShareCount: () => void
}

const SocialShareSection: React.FC<SocialShareSectionProps> = ({ 
  sharedCount, 
  incrementShareCount 
}) => {
  const handleShare = () => {
    // Create share message
    const shareText = "Check out Learnzy - an amazing platform that helped me ace my exams! It provides diagnostic tests with detailed analytics to boost your performance. Join me at https://learnzy.app"
    
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Join me on Learnzy!',
        text: shareText,
        url: 'https://learnzy.app',
      })
      .then(() => {
        incrementShareCount()
        toast.success('Thanks for sharing Learnzy!')
      })
      .catch((error) => {
        console.error('Error sharing:', error)
        // Fallback to clipboard if sharing fails
        copyToClipboard(shareText)
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        incrementShareCount()
        toast.success('Invitation link copied to clipboard!')
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error)
        toast.error('Could not copy invitation link')
      })
  }

  return (
    <div className="card-glass p-6">
      <h2 className="text-xl font-semibold mb-4">Social Share Challenge</h2>
      <p className="text-muted-foreground mb-4">
        Share Learnzy with 5 friends to unlock Physics and Chemistry diagnostic tests!
      </p>
      
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-learnzy-dark">Your progress</h3>
            <p className="text-sm text-muted-foreground">{sharedCount}/5 friends invited</p>
            
            {sharedCount >= 5 && (
              <p className="text-green-600 text-sm mt-1 font-medium">
                🎉 Physics and Chemistry tests unlocked!
              </p>
            )}
          </div>
          <button 
            className="button-primary text-sm py-2 px-4 flex items-center"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" /> Share Now
          </button>
        </div>
        
        {sharedCount > 0 && sharedCount < 5 && (
          <div className="mt-3 bg-white p-2 rounded-md border border-amber-200">
            <p className="text-sm text-amber-800">
              Keep sharing! Only {5 - sharedCount} more {5 - sharedCount === 1 ? 'share' : 'shares'} to unlock all tests.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialShareSection
