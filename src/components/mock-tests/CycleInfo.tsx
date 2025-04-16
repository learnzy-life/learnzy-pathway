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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-learnzy-amber/10 mb-6">
      <h3 className="font-semibold text-lg text-learnzy-dark mb-1">
        Cycle {cycle.number}: {cycle.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-2">{cycle.focus}</p>
      <p className="text-xs text-muted-foreground">{cycle.info}</p>

      {!isUnlocked && !hasPaid && (
        <div className="mt-3 pt-3 border-t border-dashed border-amber-200">
          <UnlockAllButton variant="default" size="sm" className="w-full" />
        </div>
      )}
    </div>
  )
}

export default CycleInfo
