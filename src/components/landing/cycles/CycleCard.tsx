
import { Card } from '@/components/ui/card'
import { Brain } from 'lucide-react'
import React from 'react'
import { useGlobalPayment } from '../../../context/GlobalPaymentContext'
import { cn } from '../../../lib/utils'

export interface CycleCardProps {
  number: number
  title: string
  focus: string
  testDescription: string
  icon: React.ReactNode
  goal?: string
}

const CycleCard: React.FC<CycleCardProps> = ({
  number,
  title,
  focus,
  testDescription,
  icon,
  goal,
}) => {
  const { hasPaid } = useGlobalPayment()

  // For demo purposes, we'll consider cycle 1 always free
  const isCycleLocked = number > 1 && !hasPaid

  return (
    <Card
      className={cn(
        'bg-white border border-learnzy-amber/30 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col relative',
        isCycleLocked && 'bg-gray-50'
      )}
    >
      {/* {isCycleLocked && (
        <div className="absolute inset-0 bg-gray-200/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-lg">
          <div className="bg-white p-3 rounded-full shadow-md">
            <Lock className="w-6 h-6 text-learnzy-amber" />
          </div>
        </div>
      )} */}

      <div className="relative p-4 sm:p-5 h-full">
        <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-learnzy-amber flex items-center justify-center text-white font-semibold text-sm">
          {number}
        </div>
        <div className="mb-3 pt-1 flex items-center">
          <div className="w-8 h-8 bg-learnzy-amber-light rounded-full flex items-center justify-center mr-2">
            {icon}
          </div>
          <h3 className="font-semibold text-lg text-[#003366]">{title}</h3>
        </div>
        <p className="text-[#003366] font-medium mb-2">{focus}</p>
        <div className="flex items-start mb-2">
          <p className="text-sm text-[#003366]/80">{testDescription}</p>
          <div className="ml-1 bg-learnzy-amber/20 px-1 rounded text-xs flex items-center">
            <Brain className="w-3 h-3 text-learnzy-amber-dark mr-1" />
            <span className="text-learnzy-amber-dark font-medium">AI</span>
          </div>
        </div>
        {goal && (
          <div className="mt-auto pt-2 border-t border-learnzy-amber/20">
            <p className="text-xs font-medium text-learnzy-amber-dark flex items-center">
              <span className="mr-1">🎯</span> Goal: {goal}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default CycleCard
