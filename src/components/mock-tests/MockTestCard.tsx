import { format } from 'date-fns'
import { CheckCircle, Sparkles } from 'lucide-react'
import React, { useEffect } from 'react'
import { MockTest } from '../../types/mock-test'

interface MockTestCardProps {
  test: MockTest
  onClick: (test: MockTest) => void
}

const MockTestCard: React.FC<MockTestCardProps> = ({ test, onClick }) => {
  // For dynamic test, make it clickable even when locked (but not if completed)
  // Tests should never be clickable when completed
  const isClickable = !test.isCompleted && (test.isDynamic || !test.isLocked)

  useEffect(() => {
    console.log('Test:', test.title, {
      isLocked: test.isLocked,
      isCompleted: test.isCompleted,
      isDynamic: test.isDynamic,
      requiresPayment: test.requiresPayment,
      unlockDate: test.unlockDate,
      condition: test.isLocked
        ? test.requiresPayment
          ? 'Showing: Unlock Cycle to Access'
          : test.isDynamic
          ? 'Showing: Complete previous tests to unlock'
          : 'Showing: 🔒 Locked'
        : test.isCompleted
        ? 'Showing: Completed'
        : 'Showing: Available Now',
    })
  }, [test])

  // This function should be called in your parent component to automatically unlock
  // the dynamic test when all regular tests are completed
  const shouldDynamicTestBeUnlocked = () => {
    // This is a placeholder - the actual check would happen in the parent component
    console.log(
      'Note: Parent component should unlock dynamic test when all tests completed'
    )
    return false
  }

  // The handle click function that respects the clickable state
  const handleClick = () => {
    if (isClickable) {
      onClick(test)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-lg p-4 border ${
        test.isDynamic ? 'border-learnzy-amber' : 'border-gray-100'
      } ${
        isClickable
          ? 'hover:border-learnzy-amber/60 cursor-pointer'
          : test.isCompleted
          ? 'opacity-80'
          : 'opacity-60 cursor-not-allowed'
      } transition-all duration-200 relative`}
    >
      {test.isDynamic && (
        <span className="absolute -top-2 -right-2 bg-learnzy-amber text-white text-xs px-2 py-0.5 rounded-full flex items-center">
          <Sparkles className="w-3 h-3 mr-1" />
          Personalized
        </span>
      )}
      <h3 className="font-medium text-learnzy-dark mb-2">{test.title}</h3>
      {test.unlockDate ? (
        <p className="text-sm text-amber-600">
          Unlocks on {format(new Date(test.unlockDate), 'MMM dd, yyyy')}
        </p>
      ) : test.isLocked ? (
        <p className="text-sm text-gray-500">
          <span className="inline-flex items-center">
            {test.requiresPayment ? (
              'Unlock Cycle to Access'
            ) : test.isDynamic ? (
              <span className="text-amber-600 font-medium">
                Generate Personalized Test
              </span>
            ) : (
              '🔒 Locked'
            )}
          </span>
        </p>
      ) : test.isCompleted ? (
        <p className="text-sm text-green-600 flex items-center">
          <CheckCircle className="w-4 h-4 mr-1" />
          Completed
        </p>
      ) : (
        <p className="text-sm text-learnzy-amber">Available Now</p>
      )}
    </div>
  )
}

export default MockTestCard
