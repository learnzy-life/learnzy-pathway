import { Book } from 'lucide-react'

const DynamicTestInfoCard = () => {
  return (
    <div className="mt-16 p-6 bg-amber-50 rounded-lg border border-amber-100">
      <div className="flex">
        <Book className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
        <div className="text-left">
          <h3 className="font-semibold text-amber-800 mb-2">
            About Your Personalized Test
          </h3>
          <p className="text-amber-700 text-sm mb-3">
            This specially crafted test focuses on your weak areas from the
            previous 4 tests in this cycle. It contains 60 questions each from
            Physics, Chemistry, and Biology (180 total), prioritizing topics
            where you need the most improvement.
          </p>
          <p className="text-amber-700 text-sm">
            The questions are selected based on your performance patterns,
            emphasizing areas where you answered incorrectly or struggled. This
            targeted approach helps you maximize your study time and improve
            your overall performance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DynamicTestInfoCard
