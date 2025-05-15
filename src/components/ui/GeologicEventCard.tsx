import { GeologicPeriod } from '../../data/geologicTimeData'

interface GeologicEventCardProps {
  period: GeologicPeriod
}

const GeologicEventCard = ({ period }: GeologicEventCardProps) => {
  // Function to get key events for geologic periods
  const getKeyEvents = (id: string): string[] => {
    const events: Record<string, string[]> = {
      // Eons
      hadean: [
        "Formation of Earth and the Moon",
        "Early bombardment of meteorites",
        "Formation of the first rocks"
      ],
      archaean: [
        "Formation of first continents",
        "First evidence of life (prokaryotes)",
        "Development of photosynthesis"
      ],
      proterozoic: [
        "Oxygenation of atmosphere begins",
        "First eukaryotic cells",
        "First multicellular life"
      ],
      phanerozoic: [
        "Evolution of complex life forms",
        "Development of terrestrial ecosystems",
        "Rise of human civilization"
      ],
      
      // Eras
      paleozoic: [
        "Cambrian explosion of life",
        "First fish, land plants, and insects",
        "Formation of Pangaea supercontinent"
      ],
      mesozoic: [
        "Dinosaurs dominate terrestrial ecosystems",
        "First mammals and birds",
        "Breakup of Pangaea begins"
      ],
      cenozoic: [
        "Mass diversification of mammals",
        "Evolution of hominids and humans",
        "Modern climate and geography established"
      ],
      
      // Periods
      cambrian: [
        "Cambrian explosion - rapid diversification of life forms",
        "First animals with shells and exoskeletons",
        "Trilobites become abundant"
      ],
      ordovician: [
        "First vertebrates (jawless fish)",
        "First true reefs",
        "Major extinction event at the end"
      ],
      silurian: [
        "First plants colonize land",
        "First jawed fish",
        "First arachnids move to land"
      ],
      devonian: [
        "Age of Fishes",
        "First forests and amphibians",
        "Tetrapods evolve from lobe-finned fish"
      ],
      carboniferous: [
        "Vast coal forests",
        "Giant insects due to high oxygen levels",
        "Radiation of early reptiles"
      ],
      permian: [
        "Diversification of reptile groups",
        "Formation of Pangaea completed",
        "Great Dying - largest mass extinction"
      ],
      triassic: [
        "Recovery from Permian extinction",
        "First dinosaurs and mammals",
        "First corals similar to modern forms"
      ],
      jurassic: [
        "Dinosaurs dominate",
        "First birds evolve",
        "Breakup of Pangaea begins"
      ],
      cretaceous: [
        "First flowering plants",
        "Peak of dinosaur diversity",
        "Asteroid impact and mass extinction"
      ],
      paleogene: [
        "Rapid diversification of mammals",
        "Formation of the Alps and Himalayas",
        "Early evolution of primates"
      ],
      neogene: [
        "Global cooling trend",
        "Spread of grasslands",
        "Evolution of hominids in Africa"
      ],
      quaternary: [
        "Cyclical ice ages",
        "Evolution of modern humans",
        "Rise of human civilization"
      ],
    }
    
    return events[id] || [
      "Evolution of various life forms",
      "Changes in Earth's climate and geography",
      "Continuation of previous evolutionary trends"
    ]
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
      <div className={`h-2 ${period.type === 'era' ? `era-${period.id}` : 
        period.type === 'eon' ? 'bg-purple-500' : 
        period.type === 'period' ? 'bg-green-500' : 
        period.type === 'epoch' ? 'bg-yellow-500' : 'bg-gray-500'}`} 
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{period.name}</h3>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded">
            {period.type.charAt(0).toUpperCase() + period.type.slice(1)}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {period.startMya} - {period.endMya} million years ago
        </div>
        
        <h4 className="text-sm font-medium mb-2">Key Events:</h4>
        <ul className="text-sm text-gray-700 dark:text-gray-300 pl-5 list-disc space-y-1">
          {getKeyEvents(period.id).map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GeologicEventCard
