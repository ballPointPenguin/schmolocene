import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { GeologicPeriod } from '../../data/geologicTimeData'

interface DraggableItemProps {
  period: GeologicPeriod
  index: number
  moveItem?: (dragIndex: number, hoverIndex: number) => void
  className?: string
}

interface DragItem {
  index: number
  id: string
  type: string
}

const DraggableItem = ({ period, index, moveItem, className = '' }: DraggableItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const [{ isDragging }, drag] = useDrag({
    type: 'geologic-period',
    item: { id: period.id, index, type: period.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop<DragItem>(() => ({
    accept: 'geologic-period',
    hover: (item, monitor) => {
      if (!ref.current || !moveItem) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally not recommended, but this is the simplest implementation
      item.index = hoverIndex
    },
  }))

  // Initialize drag and drop refs
  drag(drop(ref))

  // Different colors for different types
  const getTypeColor = () => {
    switch (period.type) {
      case 'eon':
        return 'bg-purple-100 border-purple-400 text-purple-800'
      case 'era':
        return 'bg-blue-100 border-blue-400 text-blue-800'
      case 'period':
        return 'bg-green-100 border-green-400 text-green-800'
      case 'epoch':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800'
      case 'age':
        return 'bg-red-100 border-red-400 text-red-800'
      default:
        return 'bg-gray-100 border-gray-400 text-gray-800'
    }
  }

  return (
    <div
      ref={ref}
      className={`epoch-item ${getTypeColor()} ${className} ${isDragging ? 'opacity-50' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{period.name}</span>
        <span className="text-xs opacity-70">{period.startMya}-{period.endMya} Mya</span>
      </div>
      <div className="mt-1 text-xs italic opacity-80">
        {period.type.charAt(0).toUpperCase() + period.type.slice(1)}
      </div>
    </div>
  )
}

export default DraggableItem
