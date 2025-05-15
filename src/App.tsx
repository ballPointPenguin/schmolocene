import { useState } from 'react'
import ChronologyExercise from './components/exercises/ChronologyExercise'
import ParentDivisionExercise from './components/exercises/ParentDivisionExercise'
import ExploreTimelineExercise from './components/exercises/ExploreTimelineExercise'
import HomePage from './pages/HomePage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { UserProgress } from './types/progress'

type Exercise = 'home' | 'chronology' | 'parent-division' | 'explore'

function App() {
  const [currentExercise, setCurrentExercise] = useState<Exercise>('home')
  
  // User progress state
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalAttempts: 0,
    correctAnswers: 0,
    completedExercises: 0,
    exerciseStats: {
      chronology: { attempts: 0, correct: 0 },
      parentDivision: { attempts: 0, correct: 0 }
    }
  })

  // Update user progress
  const updateProgress = (exerciseType: 'chronology' | 'parentDivision', correct: boolean) => {
    setUserProgress(prev => {
      const newExerciseStats = {
        ...prev.exerciseStats,
        [exerciseType]: {
          attempts: prev.exerciseStats[exerciseType].attempts + 1,
          correct: prev.exerciseStats[exerciseType].correct + (correct ? 1 : 0)
        }
      }

      return {
        totalAttempts: prev.totalAttempts + 1,
        correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
        completedExercises: prev.completedExercises + (correct ? 1 : 0),
        exerciseStats: newExerciseStats
      }
    })
  }

  // Handle starting an exercise from home page
  const handleStartExercise = (type: 'chronology' | 'parent-division' | 'explore') => {
    if (type === 'chronology') {
      setCurrentExercise('chronology')
    } else if (type === 'parent-division') {
      setCurrentExercise('parent-division')
    } else {
      setCurrentExercise('explore')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      <Header setExercise={(exercise) => setCurrentExercise(exercise)} currentExercise={currentExercise} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {currentExercise === 'home' ? (
          <HomePage 
            progress={userProgress} 
            onStartExercise={handleStartExercise}
            onQuizResult={(correct) => updateProgress(correct ? 'chronology' : 'parentDivision', correct)}
          />
        ) : currentExercise === 'chronology' ? (
          <ChronologyExercise 
            onResult={(correct) => updateProgress('chronology', correct)} 
          />
        ) : currentExercise === 'parent-division' ? (
          <ParentDivisionExercise 
            onResult={(correct) => updateProgress('parentDivision', correct)} 
          />
        ) : (
          <ExploreTimelineExercise />
        )}
      </main>
      
      <Footer progress={userProgress} />
    </div>
  )
}

export default App
