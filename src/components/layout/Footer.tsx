import { UserProgress } from '../../types/progress'

interface FooterProps {
  progress?: UserProgress
}

const Footer = ({ progress }: FooterProps) => {
  return (
    <footer className="bg-slate-900 py-4 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {progress && (
          <div className="text-sm text-primary-200 mb-4 md:mb-0">
            <span className="mr-4">Total exercises: {progress.completedExercises}</span>
            <span>Accuracy: {progress.totalAttempts > 0 
              ? Math.round((progress.correctAnswers / progress.totalAttempts) * 100) 
              : 0}%
            </span>
          </div>
        )}
        
        <div className="text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Holocene Schmolocene - Learn the Geologic Time Scale</p>
          <p className="mt-1">
            <a 
              href="https://github.com/ballPointPenguin/schmolocene" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-300 hover:text-primary-200 transition-colors"
            >
              View source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
