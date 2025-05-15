import { useState } from 'react'
import ChronologyExercise from './components/exercises/ChronologyExercise'
import ParentDivisionExercise from './components/exercises/ParentDivisionExercise'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

type Exercise = 'chronology' | 'parent-division'

function App() {
  const [currentExercise, setCurrentExercise] = useState<Exercise>('chronology')

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      <Header setExercise={setCurrentExercise} currentExercise={currentExercise} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {currentExercise === 'chronology' ? (
          <ChronologyExercise />
        ) : (
          <ParentDivisionExercise />
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default App
