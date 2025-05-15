export interface GeologicPeriod {
  id: string;
  name: string;
  type: 'eon' | 'era' | 'period' | 'epoch' | 'age';
  startMya: number; // millions of years ago
  endMya: number;
  parent?: string; // ID of parent division
  color?: string;
}

// Simplified geologic time scale data
export const geologicTimeData: GeologicPeriod[] = [
  // Eons
  {
    id: 'hadean',
    name: 'Hadean',
    type: 'eon',
    startMya: 4600,
    endMya: 4000,
  },
  {
    id: 'archaean',
    name: 'Archaean',
    type: 'eon',
    startMya: 4000,
    endMya: 2500,
  },
  {
    id: 'proterozoic',
    name: 'Proterozoic',
    type: 'eon',
    startMya: 2500,
    endMya: 541,
  },
  {
    id: 'phanerozoic',
    name: 'Phanerozoic',
    type: 'eon',
    startMya: 541,
    endMya: 0,
  },
  
  // Eras
  {
    id: 'paleozoic',
    name: 'Paleozoic',
    type: 'era',
    startMya: 541,
    endMya: 251.9,
    parent: 'phanerozoic',
  },
  {
    id: 'mesozoic',
    name: 'Mesozoic',
    type: 'era',
    startMya: 251.9,
    endMya: 66,
    parent: 'phanerozoic',
  },
  {
    id: 'cenozoic',
    name: 'Cenozoic',
    type: 'era',
    startMya: 66,
    endMya: 0,
    parent: 'phanerozoic',
  },
  
  // Periods - Paleozoic
  {
    id: 'cambrian',
    name: 'Cambrian',
    type: 'period',
    startMya: 541,
    endMya: 485.4,
    parent: 'paleozoic',
  },
  {
    id: 'ordovician',
    name: 'Ordovician',
    type: 'period',
    startMya: 485.4,
    endMya: 443.8,
    parent: 'paleozoic',
  },
  {
    id: 'silurian',
    name: 'Silurian',
    type: 'period',
    startMya: 443.8,
    endMya: 419.2,
    parent: 'paleozoic',
  },
  {
    id: 'devonian',
    name: 'Devonian',
    type: 'period',
    startMya: 419.2,
    endMya: 358.9,
    parent: 'paleozoic',
  },
  {
    id: 'carboniferous',
    name: 'Carboniferous',
    type: 'period',
    startMya: 358.9,
    endMya: 298.9,
    parent: 'paleozoic',
  },
  {
    id: 'permian',
    name: 'Permian',
    type: 'period',
    startMya: 298.9,
    endMya: 251.9,
    parent: 'paleozoic',
  },
  
  // Periods - Mesozoic
  {
    id: 'triassic',
    name: 'Triassic',
    type: 'period',
    startMya: 251.9,
    endMya: 201.3,
    parent: 'mesozoic',
  },
  {
    id: 'jurassic',
    name: 'Jurassic',
    type: 'period',
    startMya: 201.3,
    endMya: 145,
    parent: 'mesozoic',
  },
  {
    id: 'cretaceous',
    name: 'Cretaceous',
    type: 'period',
    startMya: 145,
    endMya: 66,
    parent: 'mesozoic',
  },
  
  // Periods - Cenozoic
  {
    id: 'paleogene',
    name: 'Paleogene',
    type: 'period',
    startMya: 66,
    endMya: 23.03,
    parent: 'cenozoic',
  },
  {
    id: 'neogene',
    name: 'Neogene',
    type: 'period',
    startMya: 23.03,
    endMya: 2.58,
    parent: 'cenozoic',
  },
  {
    id: 'quaternary',
    name: 'Quaternary',
    type: 'period',
    startMya: 2.58,
    endMya: 0,
    parent: 'cenozoic',
  },
  
  // Epochs - Paleogene
  {
    id: 'paleocene',
    name: 'Paleocene',
    type: 'epoch',
    startMya: 66,
    endMya: 56,
    parent: 'paleogene',
  },
  {
    id: 'eocene',
    name: 'Eocene',
    type: 'epoch',
    startMya: 56,
    endMya: 33.9,
    parent: 'paleogene',
  },
  {
    id: 'oligocene',
    name: 'Oligocene',
    type: 'epoch',
    startMya: 33.9,
    endMya: 23.03,
    parent: 'paleogene',
  },
  
  // Epochs - Neogene
  {
    id: 'miocene',
    name: 'Miocene',
    type: 'epoch',
    startMya: 23.03,
    endMya: 5.333,
    parent: 'neogene',
  },
  {
    id: 'pliocene',
    name: 'Pliocene',
    type: 'epoch',
    startMya: 5.333,
    endMya: 2.58,
    parent: 'neogene',
  },
  
  // Epochs - Quaternary
  {
    id: 'pleistocene',
    name: 'Pleistocene',
    type: 'epoch',
    startMya: 2.58,
    endMya: 0.0117,
    parent: 'quaternary',
  },
  {
    id: 'holocene',
    name: 'Holocene',
    type: 'epoch',
    startMya: 0.0117,
    endMya: 0,
    parent: 'quaternary',
  },
  // Just for fun - our hypothetical next epoch
  {
    id: 'schmolocene',
    name: 'Schmolocene',
    type: 'epoch',
    startMya: 0,
    endMya: -0.1, // Future! (next 100,000 years)
    parent: 'quaternary',
  },
];

// Helper functions

export const getChildrenOfDivision = (parentId: string): GeologicPeriod[] => {
  return geologicTimeData.filter(period => period.parent === parentId);
};

export const getRandomPeriods = (count: number, type?: 'eon' | 'era' | 'period' | 'epoch' | 'age'): GeologicPeriod[] => {
  const filteredData = type ? geologicTimeData.filter(p => p.type === type) : geologicTimeData;
  const shuffled = [...filteredData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getPeriodById = (id: string): GeologicPeriod | undefined => {
  return geologicTimeData.find(period => period.id === id);
};

// Get periods within a specific time range
export const getPeriodsInTimeRange = (startMya: number, endMya: number): GeologicPeriod[] => {
  return geologicTimeData.filter(period => 
    // Period overlaps with the given range
    (period.startMya >= endMya && period.endMya <= startMya) ||
    // Period contains the start of the range
    (period.startMya >= startMya && period.startMya <= endMya) ||
    // Period contains the end of the range
    (period.endMya >= startMya && period.endMya <= endMya) ||
    // Period completely contains the range
    (period.startMya <= startMya && period.endMya >= endMya)
  );
};

// Get overlapping periods
export const getOverlappingPeriods = (periodId: string): GeologicPeriod[] => {
  const period = getPeriodById(periodId);
  if (!period) return [];
  
  return geologicTimeData.filter(p => 
    p.id !== periodId && (
      // Other period overlaps with the target period
      (p.startMya <= period.startMya && p.endMya >= period.endMya) ||
      (p.startMya >= period.startMya && p.startMya <= period.endMya) ||
      (p.endMya >= period.startMya && p.endMya <= period.endMya) ||
      (p.startMya <= period.startMya && p.endMya >= period.endMya)
    )
  );
};
