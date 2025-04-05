type DynamicTestProgressBarProps = {
  progress: number
}

const DynamicTestProgressBar = ({ progress }: DynamicTestProgressBarProps) => {
  return (
    <div className="w-full bg-gray-100 rounded-full h-4 mb-4">
      <div
        className="bg-learnzy-amber h-4 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default DynamicTestProgressBar
