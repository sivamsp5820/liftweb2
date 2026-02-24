const fs = require('fs');
let content = fs.readFileSync('src/app/data/lifts.ts', 'utf8');

// 1. Add SAFETY GEAR to subcategories
content = content.replace(
    "subcategories: ['CABIN', 'SLING', 'MECHANISM', 'SYSTEM WITH', 'OL20']",
    "subcategories: ['CABIN', 'SLING', 'MECHANISM', 'SYSTEM WITH', 'OL20', 'SAFETY GEAR']"
);

// 2. Add safety-gear subcategory
content = content.replace(
    "  }\n];\n\nexport const liftModels",
    `  },
  {
    id: 'safety-gear',
    categoryId: 'non-doors',
    name: 'SAFETY GEAR',
    code: 'SAF-GEAR',
    description: 'Essential elevator safety components',
    image: 'https://images.unsplash.com/photo-1765048808260-9f48d96caf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbGlmdCUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzcxOTE0MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['High quality materials', 'Tested and certified', 'Reliable performance']
  }
];\n\nexport const liftModels`
);

// 3. Replace models
const newModels = `export const liftModels: LiftModel[] = [
  // CORE Models
  {
    id: 'core-ld',
    subcategoryId: 'core',
    name: 'LD STRUCTURE',
    code: 'CORE-LD',
    description: 'LD Structure for CORE product',
    image: 'https://images.unsplash.com/photo-1702483907449-7516bd7608a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGV2YXRvciUyMGNvbnRyb2wlMjBwYW5lbHxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 450, passengers: 6, speed: '1.0 m/s', buildingType: ['Residential'], usage: ['Low Traffic'], price: 8500,
    specifications: {
      loadCapacity: '450 kg', passengerCapacity: 6, carDimensions: '900 x 2100 mm opening', shaftDimensions: '1200 x 1400 mm',
      speed: '0.4 m/s opening speed', powerRequirement: '0.75 kW, 220V', safetyFeatures: ['Infrared sensors'], installationType: 'Standard mounting',
      travelHeight: 'Suitable for all heights', doors: 'Automatic center-opening, stainless steel'
    },
    gallery: []
  },
  {
    id: 'core-cd',
    subcategoryId: 'core',
    name: 'CD STRUCTURE',
    code: 'CORE-CD',
    description: 'CD Structure for CORE product',
    image: 'https://images.unsplash.com/photo-1702483907449-7516bd7608a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGV2YXRvciUyMGNvbnRyb2wlMjBwYW5lbHxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 450, passengers: 6, speed: '1.0 m/s', buildingType: ['Residential'], usage: ['Low Traffic'], price: 8500,
    specifications: {
      loadCapacity: '450 kg', passengerCapacity: 6, carDimensions: '900 x 2100 mm opening', shaftDimensions: '1200 x 1400 mm',
      speed: '0.4 m/s opening speed', powerRequirement: '0.75 kW, 220V', safetyFeatures: ['Infrared sensors'], installationType: 'Standard mounting',
      travelHeight: 'Suitable for all heights', doors: 'Automatic center-opening, stainless steel'
    },
    gallery: []
  },
  // CORE MD Models
  {
    id: 'core-md-ld',
    subcategoryId: 'core-md',
    name: 'LD STRUCTURE',
    code: 'CORE-MD-LD',
    description: 'LD Structure for CORE MD product',
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3MTkxNDE0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 1600, passengers: 21, speed: '1.6 m/s', buildingType: ['Hospital'], usage: ['Medical'], price: 18500,
    specifications: {
      loadCapacity: '1600 kg', passengerCapacity: 21, carDimensions: '1400 x 2400 mm opening', shaftDimensions: '1800 x 2800 mm',
      speed: '0.5 m/s opening speed', powerRequirement: '1.5 kW, 380V', safetyFeatures: ['Medical-grade sensors'], installationType: 'Medical facility approved',
      travelHeight: 'Suitable for all heights', doors: 'Wide automatic center-opening, antibacterial stainless steel'
    },
    gallery: []
  },
  {
    id: 'core-md-cd',
    subcategoryId: 'core-md',
    name: 'CD STRUCTURE',
    code: 'CORE-MD-CD',
    description: 'CD Structure for CORE MD product',
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3MTkxNDE0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 1600, passengers: 21, speed: '1.6 m/s', buildingType: ['Hospital'], usage: ['Medical'], price: 18500,
    specifications: {
      loadCapacity: '1600 kg', passengerCapacity: 21, carDimensions: '1400 x 2400 mm opening', shaftDimensions: '1800 x 2800 mm',
      speed: '0.5 m/s opening speed', powerRequirement: '1.5 kW, 380V', safetyFeatures: ['Medical-grade sensors'], installationType: 'Medical facility approved',
      travelHeight: 'Suitable for all heights', doors: 'Wide automatic center-opening, antibacterial stainless steel'
    },
    gallery: []
  },
  // STELLAR Models
  {
    id: 'stellar-ld',
    subcategoryId: 'stellar',
    name: 'LD STRUCTURE',
    code: 'STELLAR-LD',
    description: 'LD Structure for STELLAR product',
    image: 'https://images.unsplash.com/photo-1565897188739-4c8130c58a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3lzY3JhcGVyJTIwZ2xhc3MlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 800, passengers: 10, speed: '2.5 m/s', buildingType: ['Luxury Residential'], usage: ['High Traffic'], price: 24500,
    specifications: {
      loadCapacity: '800 kg', passengerCapacity: 10, carDimensions: '1200 x 2300 mm opening', shaftDimensions: '1600 x 2000 mm',
      speed: '0.8 m/s opening speed', powerRequirement: '2.2 kW, 380V', safetyFeatures: ['Premium sensors'], installationType: 'Premium mounting system',
      travelHeight: 'Suitable for all heights', doors: 'Automatic center-opening, tempered glass with stainless steel frame'
    },
    gallery: []
  },
  {
    id: 'stellar-cd',
    subcategoryId: 'stellar',
    name: 'CD STRUCTURE',
    code: 'STELLAR-CD',
    description: 'CD Structure for STELLAR product',
    image: 'https://images.unsplash.com/photo-1565897188739-4c8130c58a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3lzY3JhcGVyJTIwZ2xhc3MlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 800, passengers: 10, speed: '2.5 m/s', buildingType: ['Luxury Residential'], usage: ['High Traffic'], price: 24500,
    specifications: {
      loadCapacity: '800 kg', passengerCapacity: 10, carDimensions: '1200 x 2300 mm opening', shaftDimensions: '1600 x 2000 mm',
      speed: '0.8 m/s opening speed', powerRequirement: '2.2 kW, 380V', safetyFeatures: ['Premium sensors'], installationType: 'Premium mounting system',
      travelHeight: 'Suitable for all heights', doors: 'Automatic center-opening, tempered glass with stainless steel frame'
    },
    gallery: []
  },
  // CABIN Models`;
const startIndex = content.indexOf('export const liftModels: LiftModel[] = [');
const endIndex = content.indexOf('  // CABIN Models');
content = content.substring(0, startIndex) + newModels + content.substring(endIndex + 17);

fs.writeFileSync('src/app/data/lifts.ts', content);
