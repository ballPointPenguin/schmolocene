import { useState } from 'react'
import LearningProgressChart from '../components/ui/LearningProgressChart'
import QuizModal from '../components/ui/QuizModal'
import EarthAnimation from '../components/ui/EarthAnimation'
import GeologicTimeBanner from '../components/ui/GeologicTimeBanner'
import { UserProgress } from '../types/progress'

interface HomePageProps {
  progress: UserProgress
  onStartExercise: (type: 'chronology' | 'parent-division' | 'explore') => void
  onQuizResult: (correct: boolean) => void
}

const HomePage = ({ progress, onStartExercise, onQuizResult }: HomePageProps) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-700 rounded-xl shadow-xl p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-primary-600 dark:text-primary-300">Welcome to Holocene Schmolocene</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Learn the geologic time scale through fun, interactive exercises. Explore eons, eras, periods, epochs, and beyond!
        </p>
        
        <GeologicTimeBanner />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8">
          <div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-5">
              <h2 className="text-xl font-semibold mb-3 text-primary-500 dark:text-primary-300">Exercise Options</h2>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  onClick={() => onStartExercise('chronology')}
                >
                  <h3 className="font-medium mb-1">Chronology Exercise</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Arrange geologic periods in their correct chronological order.</p>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  onClick={() => onStartExercise('parent-division')}
                >
                  <h3 className="font-medium mb-1">Parent Division Exercise</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Match geologic periods to their parent eras.</p>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  onClick={() => onStartExercise('explore')}
                >
                  <h3 className="font-medium mb-1">Explore Timeline</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Interactive exploration of the geologic time scale.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <LearningProgressChart progress={progress} />
            </div>
            
            <button 
              className="w-full mt-6 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md shadow-md transition-colors"
              onClick={() => setIsQuizOpen(true)}
            >
              Take a Quick Quiz
            </button>
          </div>
          
          <div>
            <div className="bg-slate-800 rounded-lg shadow p-5 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-primary-300 text-center">Explore Earth's History</h2>
              <EarthAnimation />
            </div>
            
            <div className="bg-primary-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-primary-500">
              <h2 className="text-lg font-semibold mb-2">Did You Know?</h2>
              <p className="text-gray-700 dark:text-gray-300">The term "Holocene" means "entirely recent" and refers to our current geological epoch which began approximately 11,700 years ago after the last ice age. Some scientists propose that we have now entered a new epoch—the "Anthropocene"—defined by human impact on Earth's geology and ecosystems.</p>
            </div>
          </div>
        </div>
      </div>
      
      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)}
        onAnswer={onQuizResult}
      />
    </div>
  )
}

export default HomePage
