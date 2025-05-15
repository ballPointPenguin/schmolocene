import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const GeologicTimeBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Create marquee effect
      gsap.to('.time-marquee', {
        x: '-50%',
        repeat: -1,
        duration: 20,
        ease: 'linear',
      })
    }
  }, [])

  // Geological time periods to display
  const periods = [
    'Hadean', 'Archaean', 'Proterozoic', 'Cambrian', 'Ordovician', 'Silurian',
    'Devonian', 'Carboniferous', 'Permian', 'Triassic', 'Jurassic', 'Cretaceous',
    'Paleogene', 'Neogene', 'Quaternary', 'Holocene', 'Schmolocene?'
  ]

  return (
    <div 
      ref={containerRef}
      className="overflow-hidden py-3 bg-gradient-to-r from-earth-blue/20 via-earth-green/20 to-earth-brown/20 rounded-lg"
    >
      <div className="relative whitespace-nowrap">
        <div className="time-marquee inline-block">
          {periods.map((period, index) => (
            <span 
              key={index}
              className="inline-block px-4 text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
            >
              {period}
            </span>
          ))}
        </div>
        <div className="time-marquee inline-block">
          {periods.map((period, index) => (
            <span 
              key={index + periods.length}
              className="inline-block px-4 text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
            >
              {period}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GeologicTimeBanner
