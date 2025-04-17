
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { LockKeyhole } from 'lucide-react'
import UnlockAllButton from '../payment/UnlockAllButton'
import { CycleData } from '../landing/cycles/cyclesData'

interface CycleInfoProps {
  cycle: CycleData
  isUnlocked: boolean
  onUnlockClick?: () => void
}

const CycleInfo: React.FC<CycleInfoProps> = ({ cycle, isUnlocked, onUnlockClick }) => {
  return (
    <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 mb-6">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mr-2 mt-1">
              {cycle.icon}
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-learnzy-dark">
                Cycle {cycle.number}: {cycle.title}
              </h3>
              
              {/* Make focus stand out with a highlight background */}
              <div className="bg-white/80 p-2 rounded-md border-l-3 border-learnzy-amber mt-2 mb-2">
                <p className="text-sm text-learnzy-dark/90 font-medium">{cycle.focus}</p>
              </div>
              
              {cycle.goal && (
                <p className="text-xs font-medium text-learnzy-amber-dark mt-1 flex items-center">
                  <span className="mr-1">🎯</span> {cycle.goal}
                </p>
              )}
            </div>
          </div>
          
          {!isUnlocked && (
            <div className="flex items-center">
              <div className="bg-amber-200 rounded-full p-2 mr-3">
                <LockKeyhole className="h-4 w-4 text-amber-700" />
              </div>
              <UnlockAllButton
                variant="prominent"
                size="sm"
                className="whitespace-nowrap"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CycleInfo
