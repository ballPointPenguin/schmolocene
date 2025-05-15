import { useState } from 'react'
import { GeologicPeriod, getPeriodById, getChildrenOfDivision } from '../../data/geologicTimeData'
import TimelineVisualizer from '../ui/TimelineVisualizer'
import InfoPanel from '../ui/InfoPanel'
import GeologicEventCard from '../ui/GeologicEventCard'

const ExploreTimelineExercise = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<GeologicPeriod | undefined>()
  const [childPeriods, setChildPeriods] = useState<GeologicPeriod[]>([])

  const handlePeriodSelect = (period: GeologicPeriod) => {
    setSelectedPeriod(period)
    // Find child periods if any
    const children = getChildrenOfDivision(period.id)
    setChildPeriods(children)
  }

  return (
    <div className="bg-white dark:bg-slate-700 rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-primary-600 dark:text-primary-300">Explore the Timeline</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Click on a geologic time division to learn more about it. Explore the relationships between different time periods.
      </p>
      
      <TimelineVisualizer 
        selectedPeriod={selectedPeriod} 
        onPeriodSelect={handlePeriodSelect} 
      />
      
      {selectedPeriod && <InfoPanel period={selectedPeriod} />}
      
      {childPeriods.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Divisions within the {selectedPeriod?.name} {selectedPeriod?.type}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {childPeriods.map(period => (
              <GeologicEventCard key={period.id} period={period} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ExploreTimelineExercise
