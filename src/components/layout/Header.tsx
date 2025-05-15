import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

type HeaderProps = {
  setExercise: (exercise: 'chronology' | 'parent-division') => void
  currentExercise: 'chronology' | 'parent-division'
}

const Header = ({ setExercise, currentExercise }: HeaderProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
      })
    }
  }, [])

  return (
    <header className="bg-slate-800 py-6 px-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 
          ref={titleRef}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500 mb-4 md:mb-0"
        >
          Holocene Schmolocene
        </h1>
        
        <nav>
          <ul className="flex space-x-1 sm:space-x-4">
            <li>
              <button 
                onClick={() => setExercise('chronology')}
                className={`px-3 py-2 rounded-md transition-colors ${currentExercise === 'chronology' 
                  ? 'bg-primary-600 text-white' 
                  : 'text-primary-100 hover:bg-slate-700'}`}
              >
                Chronology
              </button>
            </li>
            <li>
              <button 
                onClick={() => setExercise('parent-division')}
                className={`px-3 py-2 rounded-md transition-colors ${currentExercise === 'parent-division' 
                  ? 'bg-primary-600 text-white' 
                  : 'text-primary-100 hover:bg-slate-700'}`}
              >
                Parent Divisions
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
