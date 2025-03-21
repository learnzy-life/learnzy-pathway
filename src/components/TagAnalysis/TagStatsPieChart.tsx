
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { tagOptions } from '../../pages/PreAnalysis/constants/tagOptions'
import { ScrollArea } from '../ui/scroll-area'

// Define tag colors with a new color scheme
const COLORS = [
  '#FFBD59', // Our brand color
  '#F97316', // Bright Orange
  '#F59E0B', // Amber
  '#EAB308', // Yellow
  '#84CC16', // Lime
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#0EA5E9', // Sky
  '#8B5CF6', // Violet
  '#D946EF', // Fuchsia
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

  // Sort data by value (descending) for better presentation
  const sortedData = [...data].sort((a, b) => b.value - a.value);

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

  // Custom legend that handles overflow with scrolling
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <ScrollArea className="w-full h-24 mt-4">
        <div className="px-2">
          {payload.map((entry: any, index: number) => (
            <div key={`legend-${index}`} className="flex items-center mb-2">
              <div 
                className="w-3 h-3 rounded-sm mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-gray-700">{entry.value}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="h-64">
      <ScrollArea className="w-full h-full">
        <div className="min-w-[300px] h-full pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sortedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={renderTooltip} />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ScrollArea>
    </div>
  )
}

export default TagStatsPieChart
