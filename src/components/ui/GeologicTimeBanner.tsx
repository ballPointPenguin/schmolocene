import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const GeologicTimeBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Animate the banner elements
      gsap.from('.banner-item', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="overflow-hidden py-2 bg-gradient-to-r from-earth-blue/30 via-earth-green/30 to-earth-brown/30 rounded-lg"
    >
      <div className="flex justify-between px-1 items-center animate-marquee">
        {['Hadean', 'Archaean', 'Proterozoic', 'Paleozoic', 'Mesozoic', 'Cenozoic', 'Quaternary', 'Holocene'].map((period, index) => (
          <div 
            key={index}
            className="banner-item px-4 py-1 text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap"
          >
            {period}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GeologicTimeBanner
