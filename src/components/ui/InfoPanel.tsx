import { useState } from 'react'
import { GeologicPeriod } from '../../data/geologicTimeData'

interface InfoPanelProps {
  period?: GeologicPeriod
}

const InfoPanel = ({ period }: InfoPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!period) {
    return null
  }

  // Function to get interesting facts about the period
  const getPeriodFacts = (id: string) => {
    const facts: Record<string, string[]> = {
      // Eons
      hadean: [
        "The name 'Hadean' comes from Hades, referring to the hellish conditions on Earth at that time.",
        "Earth's surface was initially molten during this time.",
        "The Moon likely formed during this eon after a Mars-sized body collided with Earth."
      ],
      archaean: [
        "The first evidence of life appeared during this eon, around 3.5 billion years ago.",
        "Stromatolites (microbial mats) began to form in shallow waters.",
        "The atmosphere had no free oxygen and was rich in methane."
      ],
      proterozoic: [
        "The name means 'earlier life'.",
        "Oxygen began to accumulate in the atmosphere during this eon.",
        "The first multicellular organisms evolved."
      ],
      phanerozoic: [
        "The name means 'visible life'.",
        "Includes all periods in which abundant fossil evidence of complex life exists.",
        "Spans from 541 million years ago to the present."
      ],
      
      // Eras
      paleozoic: [
        "The name means 'ancient life'.",
        "Began with the Cambrian explosion—a rapid diversification of animal life.",
        "Ended with the largest mass extinction in Earth's history."
      ],
      mesozoic: [
        "Often called the 'Age of Dinosaurs'.",
        "All continents were initially joined as Pangaea, which began to break apart.",
        "Ended with the extinction of the dinosaurs (except birds)."
      ],
      cenozoic: [
        "The name means 'recent life'.",
        "Often called the 'Age of Mammals'.",
        "Continents moved to their current positions during this era."
      ],
      
      // Periods
      cambrian: [
        "The Cambrian explosion occurred during this period, with most major animal phyla appearing.",
        "Trilobites were among the most successful animals of this time.",
        "The first animals with hard shells evolved."
      ],
      ordovician: [
        "Featured the first vertebrates—primitive, jawless fish.",
        "Ended with a major extinction event that killed about 85% of marine species.",
        "The first land plants appeared during this period."
      ],
      silurian: [
        "First jawed fish appeared.",
        "Terrestrial arthropods (like primitive millipedes) emerged.",
        "Vascular plants began to spread across landmasses."
      ],
      devonian: [
        "Often called the 'Age of Fishes'.",
        "The first forests appeared.",
        "The first tetrapods (four-legged vertebrates) evolved from fish."
      ],
      carboniferous: [
        "Named for the vast coal deposits that formed during this time.",
        "Giant insects thrived due to high oxygen levels.",
        "Amphibians were the dominant land vertebrates."
      ],
      permian: [
        "All continents joined to form the supercontinent Pangaea.",
        "Ended with the largest mass extinction in Earth's history (the Great Dying).",
        "Early reptiles, including ancestors of mammals, diversified."
      ],
      triassic: [
        "The first dinosaurs evolved during this period.",
        "Began after the greatest mass extinction in Earth's history.",
        "The first true mammals appeared."
      ],
      jurassic: [
        "Named after the Jura Mountains in Europe.",
        "Dinosaurs were the dominant land animals.",
        "The first birds evolved from small theropod dinosaurs."
      ],
      cretaceous: [
        "The first flowering plants (angiosperms) appeared.",
        "Ended with a massive asteroid impact that led to dinosaur extinction.",
        "Sea levels were much higher than today."
      ],
      paleogene: [
        "Mammals diversified greatly after the extinction of dinosaurs.",
        "Modern bird groups appeared.",
        "Global climate was much warmer than today."
      ],
      neogene: [
        "The global climate cooled during this period.",
        "Grasslands expanded, leading to adaptations in grazing mammals.",
        "Hominids (human ancestors) evolved in Africa."
      ],
      quaternary: [
        "Characterized by repeated glaciations (ice ages).",
        "Modern humans (Homo sapiens) evolved and spread across the planet.",
        "The most recent mass extinction is currently ongoing, largely due to human activities."
      ],
      
      // Epochs
      paleocene: [
        "Began after the extinction of dinosaurs.",
        "Mammals began to diversify into new ecological niches.",
        "Climate was warm and tropical worldwide."
      ],
      eocene: [
        "The warmest period of the Cenozoic Era.",
        "Ancestors of many modern mammal groups appeared.",
        "Antarctica was still connected to South America and Australia."
      ],
      oligocene: [
        "Global cooling began during this epoch.",
        "Grasslands began to expand, and forests declined.",
        "The first elephants with trunks appeared."
      ],
      miocene: [
        "Apes diversified, including ancestors of humans.",
        "Kelp forests appeared, creating new marine ecosystems.",
        "The Mediterranean Sea temporarily dried up multiple times (Messinian Salinity Crisis)."
      ],
      pliocene: [
        "The Panama Isthmus formed, connecting North and South America.",
        "Climate cooled further, leading toward the ice ages.",
        "The first members of the genus Homo (humans) appeared."
      ],
      pleistocene: [
        "Multiple cycles of glaciation (ice ages) occurred.",
        "Megafauna (like mammoths and giant sloths) were common.",
        "Modern humans evolved and spread across the planet."
      ],
      holocene: [
        "The current geological epoch that began after the last ice age.",
        "Human civilization developed during this time.",
        "Some scientists propose we've entered a new epoch—the Anthropocene—defined by human impact on Earth's systems."
      ],
      schmolocene: [
        "A hypothetical future epoch where humanity has fully embraced the geological nature of its existence.",
        "Named in honor of the 'Holocene Schmolocene' educational initiative that raised awareness of geologic time scales.",
        "Theoretical period where humanity shifts from being geological disruptors to geological stewards."
      ]
    }
    
    return facts[id] || [
      "No specific facts available for this period.",
      "This time period is still being studied by geologists."
    ]
  }

  // Function to get key events that occurred during the period
  const getKeyEvents = (id: string) => {
    const events: Record<string, string[]> = {
      // Just a subset of events for key periods
      cambrian: [
        "Cambrian Explosion: rapid diversification of life forms",
        "First appearance of most major animal phyla",
        "Evolution of the first hard-shelled animals"
      ],
      ordovician: [
        "First fish and vertebrates appear",
        "First plants colonize land (early mosses and liverworts)",
        "Ordovician-Silurian extinction event (about 85% of marine species disappear)"
      ],
      permian: [
        "Formation of Pangaea supercontinent",
        "Diversification of early reptiles",
        "End-Permian extinction or Great Dying (95% of marine species, 70% of terrestrial species extinct)"
      ],
      triassic: [
        "First dinosaurs appear",
        "First mammals appear",
        "Breakup of Pangaea begins"
      ],
      jurassic: [
        "Golden age of dinosaurs",
        "First birds evolve from dinosaurs",
        "Continents continue to separate"
      ],
      cretaceous: [
        "First flowering plants appear",
        "Tyrannosaurus rex and Triceratops roam North America",
        "Chicxulub asteroid impact and K-Pg extinction event"
      ],
      paleogene: [
        "Recovery from dinosaur extinction",
        "Diversification of mammals",
        "Initial formation of the Alps and Himalayas"
      ],
      neogene: [
        "Evolution of apes and early hominids",
        "Formation of the Isthmus of Panama",
        "Development of grasslands and savannas"
      ],
      pleistocene: [
        "Multiple glacial and interglacial cycles (ice ages)",
        "Evolution and spread of Homo species",
        "Extinction of many megafauna species"
      ],
      holocene: [
        "End of the last ice age",
        "Rise of human agriculture and civilization",
        "Accelerating extinction rates and climate change"
      ],
      schmolocene: [
        "Hypothetical future integration of human activity with geological processes",
        "Restoration of balanced ecosystems",
        "Establishment of sustainable human presence on Earth"
      ]
    }
    
    return events[id] || [];
  }

  // Calculate duration in millions of years
  const duration = period.startMya - period.endMya;
  const durationFormatted = duration < 0.01 ? 
    `${(duration * 1000).toFixed(1)} thousand years` : 
    `${duration.toFixed(2)} million years`;

  return (
    <div className="mt-6 p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-300">{period.name}</h3>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-primary-500 hover:text-primary-700 text-sm border border-primary-300 px-3 py-1 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
        >
          {isOpen ? 'Show Less' : 'Show More'}
        </button>
      </div>
      
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p className="mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-200">Type:</span> {period.type.charAt(0).toUpperCase() + period.type.slice(1)}
            </p>
            <p className="mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-200">Time Range:</span> {period.startMya} to {period.endMya} million years ago
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-200">Duration:</span> {durationFormatted}
            </p>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p className="mb-2 font-medium text-gray-700 dark:text-gray-200">Interesting Facts:</p>
          <ul className="list-disc pl-5 space-y-1">
            {getPeriodFacts(period.id).slice(0, isOpen ? undefined : 1).map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {isOpen && (
        <div className="mt-4">
          {getKeyEvents(period.id).length > 0 && (
            <div className="mt-4 text-sm">
              <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Key Events:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                {getKeyEvents(period.id).map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-3">Where It Fits in Geologic Time:</h4>
            
            <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
              {/* Visualize where this period sits in Earth's history */}
              <div 
                className="absolute h-full bg-primary-400 dark:bg-primary-600 opacity-70"
                style={{
                  left: `${((4600 - period.startMya) / 4600) * 100}%`,
                  width: `${((period.startMya - period.endMya) / 4600) * 100}%`,
                }}
              ></div>
              
              {/* Label */}
              <div 
                className="absolute text-xs text-white font-bold px-1 flex items-center justify-center h-full"
                style={{
                  left: `${((4600 - period.startMya) / 4600) * 100}%`,
                  width: `${((period.startMya - period.endMya) / 4600) * 100}%`,
                }}
              >
                {((period.startMya - period.endMya) / 4600) * 100 > 3 ? period.name : ''}
              </div>
              
              {/* Time markers */}
              {[0, 1000, 2000, 3000, 4000, 4600].map(time => (
                <div 
                  key={time}
                  className="absolute bottom-0 text-xs text-gray-500 dark:text-gray-400"
                  style={{ left: `${(time / 4600) * 100}%` }}
                >
                  <div className="h-2 border-l border-gray-400 dark:border-gray-500"></div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Present</span>
              <span>4.6 billion years ago</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InfoPanel
