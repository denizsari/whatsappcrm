"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ChartData {
  date?: string
  hour?: number
  value: number
  label?: string
}

interface LineChartProps {
  title: string
  description?: string
  data: ChartData[]
  color?: string
  valuePrefix?: string
  valueSuffix?: string
}

export function SimpleLineChart({ 
  title, 
  description, 
  data, 
  color = "blue",
  valuePrefix = "",
  valueSuffix = ""
}: LineChartProps) {
  const maxValue = Math.max(...data.map(item => item.value))
  const minValue = Math.min(...data.map(item => item.value))
  const range = maxValue - minValue || 1

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'stroke-green-500 fill-green-100'
      case 'red': return 'stroke-red-500 fill-red-100'
      case 'purple': return 'stroke-purple-500 fill-purple-100'
      case 'orange': return 'stroke-orange-500 fill-orange-100'
      default: return 'stroke-blue-500 fill-blue-100'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Chart area */}
            <g transform="translate(40, 20)">
              {/* Data line */}
              <path
                d={`M ${data.map((item, index) => {
                  const x = (index / (data.length - 1)) * 320
                  const y = 140 - ((item.value - minValue) / range) * 140
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
                }).join(' ')}`}
                className={getColorClass(color)}
                strokeWidth="3"
                fill="none"
              />
              
              {/* Area under curve */}
              <path
                d={`M ${data.map((item, index) => {
                  const x = (index / (data.length - 1)) * 320
                  const y = 140 - ((item.value - minValue) / range) * 140
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
                }).join(' ')} L 320 140 L 0 140 Z`}
                className={getColorClass(color)}
                fillOpacity="0.2"
                stroke="none"
              />
              
              {/* Data points */}
              {data.map((item, index) => {
                const x = (index / (data.length - 1)) * 320
                const y = 140 - ((item.value - minValue) / range) * 140
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    className={getColorClass(color).split(' ')[0]}
                    fill="currentColor"
                  />
                )
              })}
              
              {/* X-axis labels */}
              {data.map((item, index) => {
                const x = (index / (data.length - 1)) * 320
                return (
                  <text
                    key={index}
                    x={x}
                    y={165}
                    textAnchor="middle"
                    className="text-xs fill-gray-500"
                  >
                    {item.date ? new Date(item.date).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' }) : 
                     item.hour ? `${item.hour}:00` : 
                     item.label || index}
                  </text>
                )
              })}
            </g>
            
            {/* Y-axis values */}
            <g transform="translate(5, 20)">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                const value = minValue + (range * ratio)
                const y = 140 - (ratio * 140)
                return (
                  <text
                    key={index}
                    x="0"
                    y={y + 4}
                    textAnchor="start"
                    className="text-xs fill-gray-500"
                  >
                    {valuePrefix}{Math.round(value)}{valueSuffix}
                  </text>
                )
              })}
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

interface BarChartProps {
  title: string
  description?: string
  data: Array<{
    label: string
    value: number
    color?: string
  }>
  valuePrefix?: string
  valueSuffix?: string
}

export function SimpleBarChart({ 
  title, 
  description, 
  data, 
  valuePrefix = "",
  valueSuffix = ""
}: BarChartProps) {
  const maxValue = Math.max(...data.map(item => item.value))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-sm font-medium min-w-0 flex-1">
                  {item.label}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
                  <div
                    className={`h-2 rounded-full ${
                      item.color === 'green' ? 'bg-green-500' :
                      item.color === 'red' ? 'bg-red-500' :
                      item.color === 'purple' ? 'bg-purple-500' :
                      item.color === 'orange' ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`}
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-semibold ml-3">
                {valuePrefix}{item.value}{valueSuffix}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface PieChartProps {
  title: string
  description?: string
  data: Array<{
    label: string
    value: number
    color?: string
  }>
  showPercentage?: boolean
}

export function SimplePieChart({ 
  title, 
  description, 
  data,
  showPercentage = true
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Pie Chart */}
          <div className="relative">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="#f1f5f9" />
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100
                const angle = (percentage / 100) * 360
                const largeArcFlag = angle > 180 ? 1 : 0
                
                const startAngle = (currentAngle * Math.PI) / 180
                const endAngle = ((currentAngle + angle) * Math.PI) / 180
                
                const x1 = 80 + 70 * Math.cos(startAngle)
                const y1 = 80 + 70 * Math.sin(startAngle)
                const x2 = 80 + 70 * Math.cos(endAngle)
                const y2 = 80 + 70 * Math.sin(endAngle)
                
                const pathData = `M 80 80 L ${x1} ${y1} A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
                
                currentAngle += angle
                
                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={item.color || colors[index % colors.length]}
                    stroke="white"
                    strokeWidth="2"
                  />
                )
              })}
              <circle cx="80" cy="80" r="25" fill="white" />
              <text x="80" y="85" textAnchor="middle" className="text-sm font-semibold fill-gray-700">
                {total}
              </text>
            </svg>
          </div>
          
          {/* Legend */}
          <div className="space-y-2">
            {data.map((item, index) => {
              const percentage = ((item.value / total) * 100).toFixed(1)
              return (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color || colors[index % colors.length] }}
                  ></div>
                  <span className="text-sm">
                    {item.label}
                    {showPercentage && (
                      <span className="text-gray-500 ml-1">({percentage}%)</span>
                    )}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {item.value}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
