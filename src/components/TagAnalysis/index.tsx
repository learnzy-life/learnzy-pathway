
import React, { useState, useEffect } from 'react'
import { PieChart } from 'lucide-react'
import TagStatsPieChart from './TagStatsPieChart'
import { getTagStatistics } from '../../services/testSession/tagsManagement'

interface TagAnalysisProps {
  sessionId: string | null;
}

const TagAnalysis: React.FC<TagAnalysisProps> = ({ sessionId }) => {
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTagStats = async () => {
      if (!sessionId) {
        setIsLoading(false)
        return
      }

      try {
        const stats = await getTagStatistics(sessionId)
        setTagCounts(stats)
      } catch (error) {
        console.error('Error fetching tag statistics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTagStats()
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="card-glass p-6">
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-learnzy-amber/30 border-t-learnzy-amber rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-glass p-6">
      <h3 className="text-xl font-semibold text-learnzy-dark mb-6">Mistake Pattern Analysis</h3>
      
      {Object.keys(tagCounts).length > 0 ? (
        <div>
          <p className="mb-4 text-muted-foreground">
            This chart shows the common reasons you got questions wrong.
          </p>
          <TagStatsPieChart tagCounts={tagCounts} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
          <PieChart className="w-12 h-12 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No mistake patterns identified yet</p>
        </div>
      )}
    </div>
  )
}

export default TagAnalysis
