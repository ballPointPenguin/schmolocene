import { useEffect, useRef } from 'react'
import { GeologicPeriod, geologicTimeData } from '../../data/geologicTimeData'
import { gsap } from 'gsap'

interface TimelineVisualizerProps {
  selectedPeriod?: GeologicPeriod
  onPeriodSelect?: (period: GeologicPeriod) => void
}

const TimelineVisualizer = ({ selectedPeriod, onPeriodSelect }: TimelineVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate the total time span
  const maxTime = Math.max(...geologicTimeData.map(p => p.startMya))
  
  // Group periods by type for display
  const eons = geologicTimeData.filter(p => p.type === 'eon')
  const eras = geologicTimeData.filter(p => p.type === 'era')
  const periods = geologicTimeData.filter(p => p.type === 'period')

  // Calculate pixel position based on time
  const getPosition = (mya: number): number => {
    return ((maxTime - mya) / maxTime) * 100
  }

  useEffect(() => {
    if (containerRef.current && selectedPeriod) {
      // Animate to highlight selected period
      gsap.to(`#timeline-item-${selectedPeriod.id}`, {
        scale: 1.05,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        duration: 0.3,
        yoyo: true,
        repeat: 1
      })
    }
  }, [selectedPeriod])

  // Color mapping for geologic divisions
  const getColorForType = (type: string, id: string): string => {
    if (type === 'eon') return 'bg-purple-500'
    if (type === 'era') {
      if (id === 'paleozoic') return 'bg-earth-brown'
      if (id === 'mesozoic') return 'bg-earth-green'
      if (id === 'cenozoic') return 'bg-earth-blue'
      return 'bg-blue-500'
    }
    if (type === 'period') return 'bg-green-500'
    if (type === 'epoch') return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  return (
    <div ref={containerRef} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Geologic Time Scale</h3>
      
      <div className="relative h-48 overflow-x-auto">
        {/* Time scale indicators */}
        <div className="absolute bottom-0 w-full h-8 border-t border-gray-300 dark:border-gray-600">
          {[0, 500, 1000, 2000, 3000, 4000, 4600].map(time => (
            <div 
              key={time} 
              className="absolute bottom-0 text-xs text-gray-500 dark:text-gray-400" 
              style={{ left: `${getPosition(time)}%` }}
            >
              <div className="h-2 border-l border-gray-300 dark:border-gray-600 mb-1"></div>
              {time}
            </div>
          ))}
        </div>

        {/* Eons */}
        <div className="absolute top-4 w-full h-6">
          {eons.map(eon => {
            const width = (eon.startMya - eon.endMya) / maxTime * 100
            const left = getPosition(eon.startMya)
            return (
              <div 
                key={eon.id}
                id={`timeline-item-${eon.id}`}
                className={`absolute h-full ${getColorForType('eon', eon.id)} opacity-80 cursor-pointer hover:opacity-100`} 
                style={{ left: `${left}%`, width: `${width}%` }}
                onClick={() => onPeriodSelect?.(eon)}
                title={`${eon.name} (${eon.startMya}-${eon.endMya} Mya)`}
              >
                <div className="text-xs text-white truncate px-1">{eon.name}</div>
              </div>
            )
          })}
        </div>
        
        {/* Eras */}
        <div className="absolute top-12 w-full h-6">
          {eras.map(era => {
            const width = (era.startMya - era.endMya) / maxTime * 100
            const left = getPosition(era.startMya)
            return (
              <div 
                key={era.id}
                id={`timeline-item-${era.id}`}
                className={`absolute h-full ${getColorForType('era', era.id)} opacity-80 cursor-pointer hover:opacity-100`} 
                style={{ left: `${left}%`, width: `${width}%` }}
                onClick={() => onPeriodSelect?.(era)}
                title={`${era.name} (${era.startMya}-${era.endMya} Mya)`}
              >
                <div className="text-xs text-white truncate px-1">{era.name}</div>
              </div>
            )
          })}
        </div>
        
        {/* Periods */}
        <div className="absolute top-20 w-full h-6">
          {periods.map(period => {
            const width = (period.startMya - period.endMya) / maxTime * 100
            const left = getPosition(period.startMya)
            // Skip if too small to render
            if (width < 0.5) return null
            return (
              <div 
                key={period.id}
                id={`timeline-item-${period.id}`}
                className={`absolute h-full ${getColorForType('period', period.id)} opacity-80 cursor-pointer hover:opacity-100`} 
                style={{ left: `${left}%`, width: `${width}%` }}
                onClick={() => onPeriodSelect?.(period)}
                title={`${period.name} (${period.startMya}-${period.endMya} Mya)`}
              >
                <div className="text-xs text-white truncate px-1">{period.name}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        Time scale in millions of years ago (Mya)
      </div>
    </div>
  )
}

export default TimelineVisualizer
