import { UserProgress } from '../../types/progress'

interface LearningProgressChartProps {
  progress: UserProgress
}

const LearningProgressChart = ({ progress }: LearningProgressChartProps) => {
  // Calculate percentages for visualization
  const chronologyAccuracy = progress.exerciseStats.chronology.attempts > 0
    ? Math.round((progress.exerciseStats.chronology.correct / progress.exerciseStats.chronology.attempts) * 100)
    : 0

  const parentDivisionAccuracy = progress.exerciseStats.parentDivision.attempts > 0
    ? Math.round((progress.exerciseStats.parentDivision.correct / progress.exerciseStats.parentDivision.attempts) * 100)
    : 0

  const overallAccuracy = progress.totalAttempts > 0
    ? Math.round((progress.correctAnswers / progress.totalAttempts) * 100)
    : 0

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Your Learning Progress</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Chronology Exercise</span>
            <span className="text-sm font-medium">{chronologyAccuracy}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-primary-500 h-2.5 rounded-full" 
              style={{ width: `${chronologyAccuracy}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {progress.exerciseStats.chronology.correct} correct out of {progress.exerciseStats.chronology.attempts} attempts
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Parent Division Exercise</span>
            <span className="text-sm font-medium">{parentDivisionAccuracy}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-primary-500 h-2.5 rounded-full" 
              style={{ width: `${parentDivisionAccuracy}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {progress.exerciseStats.parentDivision.correct} correct out of {progress.exerciseStats.parentDivision.attempts} attempts
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Overall Accuracy</span>
            <span className="text-sm font-medium">{overallAccuracy}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${overallAccuracy > 80 ? 'bg-green-500' : 
                                               overallAccuracy > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
              style={{ width: `${overallAccuracy}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {progress.correctAnswers} correct out of {progress.totalAttempts} total attempts
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningProgressChart
