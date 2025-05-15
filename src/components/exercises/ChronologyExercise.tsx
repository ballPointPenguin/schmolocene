import { useState, useEffect, useCallback } from 'react'
import { GeologicPeriod, getRandomPeriods } from '../../data/geologicTimeData'
import DraggableItem from '../ui/DraggableItem'
import { gsap } from 'gsap'

const ChronologyExercise = () => {
  const [periods, setPeriods] = useState<GeologicPeriod[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')

  // Load periods based on difficulty
  useEffect(() => {
    // Number of items based on difficulty
    const count = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7
    const type = difficulty === 'easy' ? 'era' : difficulty === 'medium' ? 'period' : undefined
    
    // Get random periods and shuffle them
    const selectedPeriods = getRandomPeriods(count, type)
    setPeriods([...selectedPeriods].sort(() => 0.5 - Math.random()))
    setIsCorrect(null)
  }, [difficulty])

  // Move item in the list
  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setPeriods((prevPeriods) => {
      const result = [...prevPeriods]
      const [removed] = result.splice(dragIndex, 1)
      result.splice(hoverIndex, 0, removed)
      return result
    })
    // Reset check when ordering changes
    setIsCorrect(null)
  }, [])

  // Check if periods are in correct chronological order (oldest to newest)
  const checkOrder = () => {
    const sortedPeriods = [...periods].sort((a, b) => b.startMya - a.startMya)
    
    // Check if current order matches correct chronological order
    const isOrderCorrect = periods.every((period, index) => period.id === sortedPeriods[index].id)
    setIsCorrect(isOrderCorrect)

    // Animate the result
    if (isOrderCorrect) {
      gsap.to('.epoch-item', {
        scale: 1.05,
        stagger: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        duration: 0.3
      })
    } else {
      gsap.to('.epoch-item', {
        x: [-5, 5, -5, 5, 0],
        duration: 0.5,
        ease: 'power1.inOut'
      })
    }
  }

  const getNewChallenge = () => {
    // Get new random periods based on current difficulty
    const count = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7
    const type = difficulty === 'easy' ? 'era' : difficulty === 'medium' ? 'period' : undefined
    
    const selectedPeriods = getRandomPeriods(count, type)
    setPeriods([...selectedPeriods].sort(() => 0.5 - Math.random()))
    setIsCorrect(null)
  }

  return (
    <div className="bg-white dark:bg-slate-700 rounded-xl shadow-xl p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-primary-600 dark:text-primary-300">Chronology Exercise</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Drag and drop the geologic time periods to arrange them from oldest (top) to youngest (bottom).
      </p>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 rounded text-sm ${difficulty === 'easy' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-slate-600 dark:text-gray-300'}`}
            onClick={() => setDifficulty('easy')}
          >
            Easy
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${difficulty === 'medium' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-slate-600 dark:text-gray-300'}`}
            onClick={() => setDifficulty('medium')}
          >
            Medium
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${difficulty === 'hard' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-slate-600 dark:text-gray-300'}`}
            onClick={() => setDifficulty('hard')}
          >
            Hard
          </button>
        </div>
        
        <button 
          className="px-3 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-slate-600 dark:text-gray-300 dark:hover:bg-slate-500"
          onClick={getNewChallenge}
        >
          New Challenge
        </button>
      </div>
      
      <div className="mb-6 space-y-2">
        {periods.map((period, index) => (
          <DraggableItem 
            key={period.id} 
            period={period} 
            index={index} 
            moveItem={moveItem} 
          />
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-8">
        {isCorrect !== null && (
          <div className={`py-2 px-4 rounded-md ${isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
            {isCorrect 
              ? 'Correct! Great job ordering the geologic periods!' 
              : 'Not quite right. Try again!'}
          </div>
        )}
        
        <button 
          className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md shadow transition-colors"
          onClick={checkOrder}
        >
          Check Order
        </button>
      </div>
    </div>
  )
}

export default ChronologyExercise
