import { useState, useEffect } from 'react'
import { GeologicPeriod, getRandomPeriods } from '../../data/geologicTimeData'

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnswer: (correct: boolean) => void;
}

const QuizModal = ({ isOpen, onClose, onAnswer }: QuizModalProps) => {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (isOpen) {
      generateQuestion()
    }
  }, [isOpen])

  // Generate a random question about geologic time
  const generateQuestion = () => {
    const questionTypes = [
      'chronology',
      'parentDivision',
      'duration',
      'definition'
    ]

    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    
    switch (type) {
      case 'chronology':
        generateChronologyQuestion()
        break
      case 'parentDivision':
        generateParentDivisionQuestion()
        break
      case 'duration':
        generateDurationQuestion()
        break
      case 'definition':
        generateDefinitionQuestion()
        break
      default:
        generateChronologyQuestion()
    }
    
    setSelectedAnswer(null)
    setIsAnswered(false)
    setFeedback('')
  }

  const generateChronologyQuestion = () => {
    const periods = getRandomPeriods(4, 'period')
    
    // Sort by start time (oldest first)
    const sortedPeriods = [...periods].sort((a, b) => b.startMya - a.startMya)
    
    const first = sortedPeriods[0]
    const second = sortedPeriods[1]
    
    setQuestion(`Which came first: the ${first.name} or the ${second.name}?`)
    setOptions([first.name, second.name])
    setCorrectAnswer(first.name)
  }

  const generateParentDivisionQuestion = () => {
    const periods = getRandomPeriods(10, 'period')
    const selected = periods[0]
    
    // Find actual parent
    const parentName = selected.parent === 'paleozoic' ? 'Paleozoic' : 
                       selected.parent === 'mesozoic' ? 'Mesozoic' : 
                       selected.parent === 'cenozoic' ? 'Cenozoic' : 'Unknown'
    
    // Generate wrong answers
    let wrongAnswers = ['Paleozoic', 'Mesozoic', 'Cenozoic'].filter(name => 
      name.toLowerCase() !== selected.parent
    )
    
    // Add distractor
    wrongAnswers.push('Precambrian')
    
    // Shuffle wrong answers and take first 3
    wrongAnswers = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 3)
    
    // Combine and shuffle all options
    const allOptions = [parentName, ...wrongAnswers].sort(() => 0.5 - Math.random())
    
    setQuestion(`Which era does the ${selected.name} period belong to?`)
    setOptions(allOptions)
    setCorrectAnswer(parentName)
  }

  const generateDurationQuestion = () => {
    const periods = getRandomPeriods(8)
    const selected = periods[0]
    
    const duration = selected.startMya - selected.endMya
    
    // Generate wrong answers approximately 30-50% off
    const wrongAnswers = [
      Math.round(duration * (0.5 + Math.random() * 0.2)),
      Math.round(duration * (1.3 + Math.random() * 0.2)),
      Math.round(duration * (0.7 + Math.random() * 0.2))
    ]
    
    // Combine and shuffle all options
    const allOptions = [duration.toString(), ...wrongAnswers.map(w => w.toString())].sort(() => 0.5 - Math.random())
    
    setQuestion(`Approximately how many million years did the ${selected.name} ${selected.type} last?`)
    setOptions(allOptions)
    setCorrectAnswer(duration.toString())
  }

  const generateDefinitionQuestion = () => {
    const terms = [
      { term: 'Eon', definition: 'The largest division of geological time, spanning hundreds of millions to billions of years' },
      { term: 'Era', definition: 'A major division of geological time, typically spanning tens to hundreds of millions of years' },
      { term: 'Period', definition: 'A division of geological time that represents a system of rocks deposited during that time' },
      { term: 'Epoch', definition: 'A subdivision of a geological period, typically spanning millions of years' },
      { term: 'Age', definition: 'The smallest formally recognized division of geological time' },
      { term: 'Mass Extinction', definition: 'An event where a large percentage of species die out in a relatively short period of geological time' },
      { term: 'Stratigraphy', definition: 'The branch of geology concerned with the order and relative position of strata' },
      { term: 'Supercontinent', definition: 'A landmass comprised of multiple continental cores, such as Pangaea' }
    ]
    
    const selectedTerm = terms[Math.floor(Math.random() * terms.length)]
    
    // Get 3 wrong definitions
    const wrongDefinitions = terms
      .filter(t => t.term !== selectedTerm.term)
      .map(t => t.definition)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
    
    // Combine and shuffle all options
    const allOptions = [selectedTerm.definition, ...wrongDefinitions].sort(() => 0.5 - Math.random())
    
    setQuestion(`What is the definition of '${selectedTerm.term}'?`)
    setOptions(allOptions)
    setCorrectAnswer(selectedTerm.definition)
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setIsAnswered(true)
    
    const isCorrect = answer === correctAnswer
    
    setFeedback(isCorrect ? 
      'Correct! Well done.' : 
      `Incorrect. The correct answer is: ${correctAnswer}`
    )
    
    onAnswer(isCorrect)
  }

  // Handle continue
  const handleContinue = () => {
    if (isAnswered) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Geologic Quiz</h3>
        
        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">{question}</p>
          
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !isAnswered && handleAnswerSelect(option)}
                className={`w-full text-left p-3 rounded-md ${isAnswered && option === correctAnswer
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                  : isAnswered && option === selectedAnswer
                  ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  : 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600'}`}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>
          
          {isAnswered && (
            <div className={`mt-4 p-3 rounded-md ${feedback.startsWith('Correct') 
              ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200' 
              : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-200'}`}
            >
              {feedback}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md shadow"
          >
            {isAnswered ? 'Continue' : 'Skip'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizModal
