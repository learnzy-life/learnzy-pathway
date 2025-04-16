import { EyeIcon, ZoomIn, ZoomOut } from 'lucide-react'
import React from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { TimeData } from './types'

// Update the type to include question text/context
interface EnhancedTimeData extends TimeData {
  questionText?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  questions?: Record<number, string>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, questions = {} }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const timeDiff = data.actualTime - data.idealTime
    const isSlower = timeDiff > 0

    console.log("data", data)

    // Get question text from the data or questions lookup
    const questionText = data.questionText || questions[data.questionId] || 'Question content not available'

    // Truncate question text if too long (for tooltip readability)
    const truncatedText = questionText.length > 100
      ? `${questionText.substring(0, 100)}...`
      : questionText

    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <p className="font-medium text-learnzy-purple">Question {data.questionId}</p>
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
            isSlower ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {isSlower ? 'Slower' : 'Faster'}
          </span>
        </div>

        <div className="border-b border-gray-100 pb-2 mb-2">
          <p className="text-sm text-gray-700 break-words">{truncatedText}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">Your time</p>
            <p className="text-sm font-medium">{formatTime(data.actualTime)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Ideal time</p>
            <p className="text-sm font-medium">{formatTime(data.idealTime)}</p>
          </div>
        </div>

        <p className={`text-xs mt-2 font-medium ${
          isSlower ? 'text-red-600' : 'text-green-600'
        }`}>
          {isSlower
            ? `${formatTime(Math.abs(timeDiff))} slower than ideal`
            : `${formatTime(Math.abs(timeDiff))} faster than ideal`}
        </p>
      </div>
    )
  }

  return null
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)

  if (mins === 0) {
    return `${secs}s`
  }

  return `${mins}m ${secs}s`
}

interface TimeChartSectionProps {
  timeData: TimeData[];
  questionTexts?: Record<number, string>; // Map of question IDs to their text content
}

const TimeChartSection: React.FC<TimeChartSectionProps> = ({
  timeData,
  questionTexts = {}
}) => {
  const { subject } = useParams()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('sessionId')
  const [zoom, setZoom] = React.useState(false)

  // Check if timeData exists and has elements
  const hasTimeData = Array.isArray(timeData) && timeData.length > 0

  // Generate stats safely
  const totalActualTime = hasTimeData
    ? timeData.reduce((sum, item) => sum + item.actualTime, 0)
    : 0
  const totalIdealTime = hasTimeData
    ? timeData.reduce((sum, item) => sum + item.idealTime, 0)
    : 0
  const avgTimePerQuestion = hasTimeData ? totalActualTime / timeData.length : 0

  const slowerQuestions = hasTimeData
    ? timeData.filter((q) => q.actualTime > q.idealTime).length
    : 0
  const fasterQuestions = hasTimeData
    ? timeData.filter((q) => q.actualTime <= q.idealTime).length
    : 0

  // Find the extremes
  const extremeQuestions = hasTimeData
    ? timeData
        .map((q) => ({
          ...q,
          timeDiff: q.actualTime - q.idealTime,
        }))
        .sort((a, b) => Math.abs(b.timeDiff) - Math.abs(a.timeDiff))
        .slice(0, 3)
    : []

  const toggleZoom = () => {
    setZoom(!zoom)
  }

  return (
    <div className="card-glass p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-learnzy-dark">
          Time per Question
        </h3>
        <div className="flex gap-2">
          <button
            onClick={toggleZoom}
            className="button-secondary flex items-center text-xs py-1 px-2 sm:text-sm sm:py-2 sm:px-3"
            aria-label={zoom ? 'Zoom out' : 'Zoom in'}
          >
            {zoom ? (
              <ZoomOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            ) : (
              <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            )}
            {zoom ? 'Zoom Out' : 'Zoom In'}
          </button>
          <Link
            to={`/review/${subject}${
              sessionId ? `?sessionId=${sessionId}` : ''
            }`}
            className="button-secondary flex items-center text-xs py-1 px-2 sm:text-sm sm:py-2 sm:px-3"
          >
            <EyeIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Review
            Questions
          </Link>
        </div>
      </div>

      <div
        className={`${
          zoom ? 'h-[600px]' : 'h-64 sm:h-72'
        } mb-4 sm:mb-6 overflow-x-auto`}
      >
        {hasTimeData ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              margin={{ top: 20, right: 20, bottom: 60, left: 30 }}
              data={timeData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="questionId"
                name="Question"
                domain={[0, 'dataMax']}
                label={{
                  value: 'Question Number',
                  position: 'insideBottom',
                  offset: -15,
                }}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                type="number"
                name="Time"
                label={{
                  value: 'Time (seconds)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: -10,
                  fontSize: 12,
                }}
                tick={{ fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip questions={questionTexts} />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '30px', paddingLeft: '80px' }}
              />
              <Bar
                dataKey="actualTime"
                name="Your Time"
                fill="#4f46e5"
                barSize={20}
              />
              <Bar
                dataKey="idealTime"
                name="Ideal Time"
                fill="#FFBD59"
                barSize={20}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground text-center text-sm">
              Not enough data to display time chart. <br />
              Either no questions were attempted or time data is incomplete.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100 shadow-subtle">
          <h4 className="text-xs sm:text-sm text-muted-foreground mb-1">
            Avg. Time per Question
          </h4>
          <div className="text-base sm:text-xl font-semibold text-learnzy-dark">
            {formatTime(avgTimePerQuestion)}
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100 shadow-subtle">
          <h4 className="text-xs sm:text-sm text-muted-foreground mb-1">
            Questions Slower Than Ideal
          </h4>
          <div className="text-base sm:text-xl font-semibold text-red-500">
            {slowerQuestions}
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-100 shadow-subtle">
          <h4 className="text-xs sm:text-sm text-muted-foreground mb-1">
            Questions Faster Than Ideal
          </h4>
          <div className="text-base sm:text-xl font-semibold text-green-500">
            {fasterQuestions}
          </div>
        </div>
      </div>

      {extremeQuestions.length > 0 && (
        <div>
          <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">
            Most Significant Time Deviations
          </h4>
          <div className="space-y-2 sm:space-y-3">
            {extremeQuestions.map((q) => (
              <div
                key={q.questionId}
                className={`p-2 sm:p-3 rounded-lg border ${
                  q.timeDiff > 0
                    ? 'bg-red-50 border-red-100'
                    : 'bg-green-50 border-green-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="font-medium text-sm block mb-1">
                      Question {q.questionId}
                    </span>
                    {questionTexts[q.questionId] && (
                      <span className="text-xs text-gray-600 line-clamp-1">
                        {questionTexts[q.questionId]}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs sm:text-sm whitespace-nowrap ml-2 ${
                      q.timeDiff > 0 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {q.timeDiff > 0
                      ? `${formatTime(q.timeDiff)} slower`
                      : `${formatTime(Math.abs(q.timeDiff))} faster`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeChartSection
