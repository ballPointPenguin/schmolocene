import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const EarthAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (svgRef.current) {
      // Create timeline for earth animation
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
      })

      // Animate the earth rotation
      tl.to('.earth-rotation', {
        rotate: 360,
        duration: 30,
        ease: 'linear',
        transformOrigin: 'center',
        repeat: -1,
      })

      // Animate the continents
      tl.to('.continent', {
        fill: '#3a8559',
        duration: 2,
        stagger: 0.2,
        ease: 'power2.inOut',
      }, '<')

      // Animate the time periods to show evolution
      gsap.to('.time-marker', {
        scale: 1.2,
        opacity: 1,
        stagger: 3,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
      })
    }
  }, [])

  return (
    <svg 
      ref={svgRef}
      viewBox="0 0 400 400" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm mx-auto"
    >
      {/* Background */}
      <rect width="400" height="400" fill="#001220" rx="8" />
      
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <circle 
          key={i}
          cx={Math.random() * 400}
          cy={Math.random() * 400}
          r={Math.random() * 1.5}
          fill="white"
          opacity={Math.random() * 0.8 + 0.2}
        />
      ))}
      
      {/* Earth group */}
      <g className="earth-rotation" transform="translate(200, 200)">
        {/* Ocean */}
        <circle cx="0" cy="0" r="100" fill="#1E3A8A" />
        
        {/* Continents */}
        <path 
          className="continent" 
          d="M-20,-70 C-10,-60 0,-50 20,-60 C30,-70 40,-60 50,-70 C60,-80 70,-70 80,-60 C70,-40 80,-20 70,0 C80,20 70,40 60,50 C50,60 40,70 20,60 C10,70 0,60 -10,70 C-20,60 -30,70 -40,60 C-50,50 -40,40 -50,30 C-60,20 -50,10 -60,0 C-70,-10 -60,-20 -50,-30 C-40,-40 -50,-50 -40,-60 C-30,-70 -20,-60 -20,-70z" 
          fill="#2D3748" 
          opacity="0.9"
        />
        
        <path 
          className="continent" 
          d="M-80,20 C-70,30 -60,20 -50,30 C-40,40 -50,50 -40,60 C-30,50 -20,60 -10,50 C0,60 10,50 0,40 C-10,30 0,20 -10,10 C-20,0 -10,-10 -20,-20 C-30,-10 -40,-20 -50,-10 C-60,0 -70,-10 -80,0 C-90,10 -80,20 -80,20z" 
          fill="#2D3748" 
          opacity="0.9"
        />
        
        {/* Ice caps */}
        <circle cx="0" cy="-80" r="20" fill="white" opacity="0.9" />
        <circle cx="0" cy="80" r="15" fill="white" opacity="0.9" />
        
        {/* Time markers representing different geological periods */}
        <circle className="time-marker" cx="-60" cy="-30" r="5" fill="#9F7AEA" opacity="0.6" data-period="Precambrian" />
        <circle className="time-marker" cx="-40" cy="10" r="5" fill="#ED8936" opacity="0.6" data-period="Paleozoic" />
        <circle className="time-marker" cx="20" cy="-50" r="5" fill="#38B2AC" opacity="0.6" data-period="Mesozoic" />
        <circle className="time-marker" cx="50" cy="20" r="5" fill="#4299E1" opacity="0.6" data-period="Cenozoic" />
        <circle className="time-marker" cx="10" cy="50" r="5" fill="#48BB78" opacity="0.6" data-period="Quaternary" />
      </g>
      
      {/* Orbit ring */}
      <circle cx="200" cy="200" r="120" stroke="#4A5568" strokeWidth="1" fill="none" strokeDasharray="5,5" />
    </svg>
  )
}

export default EarthAnimation
