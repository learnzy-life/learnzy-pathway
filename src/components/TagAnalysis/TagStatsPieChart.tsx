
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { tagOptions } from '../../pages/PreAnalysis/constants/tagOptions'

// Define tag colors
const COLORS = [
  '#FFBD59', // Our brand color
  '#E6A64E',
  '#CC8F43',
  '#B37938',
  '#996E3A',
  '#805A31',
  '#664627',
  '#4D331E',
  '#331F14',
  '#1A0A0A',
]

interface TagStatsData {
  name: string;
  value: number;
}

interface TagStatsPieChartProps {
  tagCounts: Record<string, number>;
}

const TagStatsPieChart: React.FC<TagStatsPieChartProps> = ({ tagCounts }) => {
  // Convert tag counts to chart data
  const data: TagStatsData[] = Object.entries(tagCounts).map(([tagId, count]) => {
    // Find the tag label from tagOptions
    const tagOption = tagOptions.find(tag => tag.id === tagId)
    return {
      name: tagOption ? tagOption.label : tagId,
      value: count
    }
  }).filter(item => item.value > 0) // Only include tags with non-zero counts

  // If no data, show placeholder
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-muted-foreground">No mistake patterns identified</p>
      </div>
    )
  }

  // Custom tooltip for the pie chart
  const renderTooltip = (props: any) => {
    const { active, payload } = props
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-600">Count: {payload[0].value}</p>
          <p className="text-sm text-gray-600">
            {Math.round((payload[0].value / data.reduce((sum, item) => sum + item.value, 0)) * 100)}% of mistakes
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TagStatsPieChart
