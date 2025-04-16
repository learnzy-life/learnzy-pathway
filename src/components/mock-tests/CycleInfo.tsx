import { LockKeyhole } from 'lucide-react'
import React from 'react'
import { useGlobalPayment } from '../../context/GlobalPaymentContext'
import { CycleData } from '../landing/cycles/cyclesData'
import UnlockAllButton from '../payment/UnlockAllButton'

interface CycleInfoProps {
  cycle: CycleData
  isUnlocked: boolean
}

const CycleInfo: React.FC<CycleInfoProps> = ({ cycle, isUnlocked }) => {
  const { hasPaid } = useGlobalPayment()

  return (
    <div
      className={`bg-white p-5 rounded-lg shadow-sm ${
        !isUnlocked
          ? 'border-2 border-amber-200/50'
          : 'border border-learnzy-amber/10'
      } mb-6 transition-all duration-300`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-learnzy-dark mb-1 flex items-center">
            Cycle {cycle.number}: {cycle.title}
            {!isUnlocked && (
              <span className="inline-flex ml-2 items-center">
                <LockKeyhole className="h-4 w-4 text-amber-500" />
              </span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{cycle.focus}</p>
          <p className="text-xs text-muted-foreground">{cycle.info}</p>
        </div>

        {!isUnlocked && !hasPaid && (
          <div className="hidden md:block">
            <UnlockAllButton variant="subtle" size="sm" />
          </div>
        )}
      </div>

      {!isUnlocked && !hasPaid && (
        <div className="mt-4 pt-3 border-t border-dashed border-amber-200 md:hidden">
          <UnlockAllButton variant="default" size="sm" className="w-full" />
        </div>
      )}
    </div>
  )
}

export default CycleInfo
