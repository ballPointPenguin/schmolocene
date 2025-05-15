import { useState, useEffect } from 'react'
import { GeologicPeriod, getRandomPeriods, getPeriodById } from '../../data/geologicTimeData'
import DraggableItem from '../ui/DraggableItem'
import DropTarget from '../ui/DropTarget'
import { gsap } from 'gsap'

const ParentDivisionExercise = () => {
  // Main eras that will serve as drop targets
  const mainEras = ['paleozoic', 'mesozoic', 'cenozoic']
  
  // Current period to be placed
  const [currentPeriod, setCurrentPeriod] = useState<GeologicPeriod | null>(null)
  
  // Track correct/incorrect answers for each era
  const [eraResults, setEraResults] = useState<Record<string, boolean | null>>({
    paleozoic: null,
    mesozoic: null,
    cenozoic: null,
  })
  
  // Score tracking
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  
  // Initialize with a random period from eras' children
  useEffect(() => {
    if (!gameComplete) {
      nextPeriod()
    }
  }, [gameComplete])
  
  // Get a random period that belongs to one of the main eras
  const nextPeriod = () => {
    const periods = getRandomPeriods(10, 'period')
    const validPeriods = periods.filter(p => {
      const parent = getPeriodById(p.parent || '')
      return parent && mainEras.includes(parent.id)
    })
    
    if (validPeriods.length > 0) {
      setCurrentPeriod(validPeriods[0])
      // Reset results for new period
      setEraResults({
        paleozoic: null,
        mesozoic: null,
        cenozoic: null,
      })
    }
  }
  
  // Handle dropping a period into an era
  const handleDrop = (itemId: string, targetId: string) => {
    if (!currentPeriod) return
    
    // Get the parent era of the period
    const period = getPeriodById(itemId)
    if (!period) return
    
    const periodParent = getPeriodById(period.parent || '')
    if (!periodParent) return
    
    // Check if the drop target is the correct parent
    const isCorrect = periodParent.id === targetId
    
    // Update era results
    setEraResults(prev => ({
      ...prev,
      [targetId]: isCorrect
    }))
    
    // Update score and attempts
    setAttempts(prev => prev + 1)
    if (isCorrect) {
      setScore(prev => prev + 1)
      
      // Animate success
      gsap.to(`.era-${targetId}`, {
        scale: 1.05,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        yoyo: true,
        repeat: 1,
        duration: 0.3,
        onComplete: () => {
          // Move to next period
          setTimeout(() => {
            nextPeriod()
          }, 1000)
        }
      })
    } else {
      // Animate failure
      gsap.to(`.era-${targetId}`, {
        x: [-5, 5, -5, 5, 0],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        duration: 0.5,
        onComplete: () => {
          // Reset this era's result after animation
          setTimeout(() => {
            setEraResults(prev => ({
              ...prev,
              [targetId]: null
            }))
          }, 1000)
        }
      })
    }
    
    // Check if game should end
    if (attempts >= 9) {
      setGameComplete(true)
    }
  }
  
  // Reset the game
  const resetGame = () => {
    setScore(0)
    setAttempts(0)
    setGameComplete(false)
    setEraResults({
      paleozoic: null,
      mesozoic: null,
      cenozoic: null,
    })
  }
  
  return (
    <div className="bg-white dark:bg-slate-700 rounded-xl shadow-xl p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-primary-600 dark:text-primary-300">Parent Division Exercise</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Drag the geologic period to its parent era (Paleozoic, Mesozoic, or Cenozoic).
      </p>
      
      {!gameComplete ? (
        <>
          <div className="mb-8 flex justify-between items-center">
            <div className="text-gray-700 dark:text-gray-300">
              Score: <span className="font-bold">{score}</span> / Attempts: <span className="font-bold">{attempts}</span>
            </div>
          </div>
          
          <div className="mb-8 flex flex-col items-center">
            {currentPeriod && (
              <div className="mb-4">
                <DraggableItem period={currentPeriod} index={0} className="w-64" />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {mainEras.map(eraId => {
              const era = getPeriodById(eraId);
              if (!era) return null;
              
              return (
                <div key={eraId} className="flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 text-center">{era.name} Era</h3>
                  <DropTarget
                    parentId={eraId}
                    onDrop={handleDrop}
                    isCorrect={eraResults[eraId]}
                    className={`era-${eraId} era-box era-${eraId} min-h-32 flex items-center justify-center`}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Game Complete!</h3>
          <p className="text-xl mb-6">Your final score: {score} / {attempts}</p>
          <button
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md shadow transition-colors"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default ParentDivisionExercise
