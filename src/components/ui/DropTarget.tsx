import { useDrop } from 'react-dnd'
import { GeologicPeriod } from '../../data/geologicTimeData'

interface DropTargetProps {
  parentId: string
  onDrop: (itemId: string, targetId: string) => void
  isCorrect: boolean | null
  children?: React.ReactNode
  className?: string
}

const DropTarget = ({ parentId, onDrop, isCorrect, children, className = '' }: DropTargetProps) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'geologic-period',
    drop: (item: { id: string }) => {
      onDrop(item.id, parentId)
      return { parentId }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  let borderColor = 'border-gray-300 dark:border-gray-600'
  if (isOver && canDrop) {
    borderColor = 'border-primary-400 dark:border-primary-500'
  } else if (isCorrect === true) {
    borderColor = 'border-green-400 dark:border-green-500'
  } else if (isCorrect === false) {
    borderColor = 'border-red-400 dark:border-red-500'
  }

  return (
    <div
      ref={drop}
      className={`drop-target ${borderColor} ${className} ${isOver && canDrop ? 'bg-primary-50 dark:bg-primary-900/20' : 'bg-white dark:bg-slate-800'}`}
    >
      {children || <div className="text-center text-gray-400 dark:text-gray-500">Drop here</div>}
    </div>
  )
}

export default DropTarget
