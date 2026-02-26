// Mock data for lift products

export const liftCategories = [
  {
    id: 'doors',
    name: 'Doors',
    description: 'Premium door systems and components for elevator installations',
    image: 'https://images.unsplash.com/photo-1702483907449-7516bd7608a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGV2YXRvciUyMGNvbnRyb2wlMjBwYW5lbHxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    subcategories: ['CORE', 'CORE MD', 'STELLAR']
  },
  {
    id: 'non-doors',
    name: 'Non Doors',
    description: 'Essential lift components including cabins, mechanisms, and control systems',
    image: 'https://images.unsplash.com/photo-1765048808260-9f48d96caf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbGlmdCUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzcxOTE0MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    subcategories: ['CABIN', 'SLING', 'MECHANISM', 'SYSTEM WITH', 'OL20', 'SAFETY GEAR']
  }
];

export const liftSubcategories = [
  // Doors Category
  {
    id: 'core',
    categoryId: 'doors',
    name: 'CORE',
    code: 'CORE',
    description: 'Standard door system with robust construction and reliable operation for residential and light commercial applications',
    image: 'https://images.unsplash.com/photo-1702483907449-7516bd7608a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGV2YXRvciUyMGNvbnRyb2wlMjBwYW5lbHxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Automatic sliding mechanism', 'Stainless steel finish', 'Safety sensors', 'Quiet operation']
  },
  {
    id: 'core-md',
    categoryId: 'doors',
    name: 'COREMD',
    code: 'COREMD',
    description: 'Medical-duty door system designed for healthcare facilities with antibacterial surfaces and wide openings',
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3MTkxNDE0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Wide clear opening', 'Antibacterial coating', 'Stretcher compatible', 'Emergency override']
  },
  {
    id: 'stellar',
    categoryId: 'doors',
    name: 'STELAR',
    code: 'STELAR',
    description: 'Premium door system featuring advanced aesthetics and high-speed operation for luxury installations',
    image: 'https://images.unsplash.com/photo-1565897188739-4c8130c58a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3lzY3JhcGVyJTIwZ2xhc3MlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Premium glass panels', 'High-speed mechanism', 'LED lighting integration', 'Luxury finishes']
  },
  // Non Doors Category
  {
    id: 'cabin',
    categoryId: 'non-doors',
    name: 'CABIN',
    code: 'CABIN',
    description: 'Complete cabin solutions with customizable interior finishes and lighting options',
    image: 'https://images.unsplash.com/photo-1770821030454-5e3ccb2d96dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvbWUlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Modular design', 'Multiple finish options', 'LED ceiling panels', 'Mirror walls available']
  },
  {
    id: 'sling',
    categoryId: 'non-doors',
    name: 'SLING',
    code: 'SLING',
    description: 'Structural sling frames providing the foundation for lift cabin installation',
    image: 'https://images.unsplash.com/photo-1765048808260-9f48d96caf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbGlmdCUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzcxOTE0MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Heavy-duty steel construction', 'Precision engineering', 'Anti-vibration mounts', 'Quick installation']
  },
  {
    id: 'mechanism',
    categoryId: 'non-doors',
    name: 'MECHANISM',
    code: 'MECH',
    description: 'Advanced drive mechanisms and motor systems for smooth and efficient lift operation',
    image: 'https://images.unsplash.com/photo-1769734711473-6544be810904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVpZ2h0JTIwY2FyZ28lMjBsaWZ0fGVufDF8fHx8MTc3MTkxNDE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Energy-efficient motors', 'Regenerative drive', 'Low maintenance', 'Precision control']
  },
  {
    id: 'system-with',
    categoryId: 'non-doors',
    name: 'SYSTEM WITH',
    code: 'SYS-W',
    description: 'Complete integrated lift systems with all components included for turnkey installation',
    image: 'https://images.unsplash.com/photo-1544415224-e4b67cd64504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['All-inclusive package', 'Pre-configured system', 'Faster installation', 'Complete warranty']
  },
  {
    id: 'ol20',
    categoryId: 'non-doors',
    name: 'OL20',
    code: 'OL20',
    description: 'Compact overload-rated system designed for space-constrained installations',
    image: 'https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzE4OTU5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Space-saving design', 'Overload protection', 'Machine room less', 'Modern aesthetics']
  },
  {
    id: 'safety-gear',
    categoryId: 'non-doors',
    name: 'SAFETY GEAR',
    code: 'SAF-GEAR',
    description: 'Essential elevator safety components',
    image: 'https://images.unsplash.com/photo-1765048808260-9f48d96caf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbGlmdCUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzcxOTE0MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['High quality materials', 'Tested and certified', 'Reliable performance']
  }
];

export const liftModels = [
  // CORE Models
  {
    id: 'core-ld',
    subcategoryId: 'core',
    name: 'CORE LD',
    code: 'CORE-LD',
    description: 'Landing Door for CORE product set',
    image: 'https://images.unsplash.com/photo-1702483907449-7516bd7608a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGV2YXRvciUyMGNvbnRyb2wlMjBwYW5lbHxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 450, passengers: 6, speed: '1.0 m/s', buildingType: ['Residential'], usage: ['Low Traffic'], price: 8500,
    specifications: {
      doorType: 'Landing Door',
      doorOpenType: ['C2', 'T2'],
      doorOpeningWidth: ['700', '800', '900', '1000'],
      doorHeight: ['2000', '2100', '2200'],
      grade: ['MS', 'SS304', 'SS441', 'SS430'],
      finish: ['No4', 'Mirror', 'Special', 'NonStd'],
      panelFinish: ['Cladded', 'DirectMS', 'DirectSS'],
      panelType: ['STD', 'SVP', 'FGD', 'HGD'],
      basePanelThicknessMS: ['0.6', '0.8', '1', '1.2'],
      directSSThickness: ['1', '1.2', '1.5'],
      frameSize: ['50', '90', '120'],
      frameFinish: ['Cladded', 'DirectMS', 'DirectSS'],
      frameDimensions: ['50x40x50', '90x40x190', '90x60x190', '120x60x190'],
      frameBaseThickness: ['1'],
      toeGuardHeight: ['200', '300', '400'],
      toeGuardFinish: ['GI', 'MSPowder', 'CED'],
      safetyNorms: ['EN81-20', 'EN81-50', 'BS470', 'IS17900'],
      fireCertification: ['EN81-58', 'BS476', 'IS17518'],
      glassOption: ['Glass', 'NonGlass'],
      processing: ['Stamping', 'Laser'],
      runby: ['Yes', 'No'],
      sPlate: ['Yes', 'No'],
      coverSill: ['Yes', 'No'],
      groutPlate: ['Yes'],
      claddingThickness: ['0.4', '0.5', '0.6', '0.7', '0.8'],
      pitEgress: ['Yes', 'No'],
      shipmentType: ['FullSupply', 'PartA', 'PartB'],
      closingMethod: ['Spring'],
      glassFinishFGD: ['Standard', 'TintedGrey', 'TintedBrown']
    },
    items: [
      { description: "COR LD 01C 700x20 FVP", code: "SO0014658COR1C7020FVSS430", subDescription: "COR-LD-050-CP-DF-00-EN" },
      { description: "COR LD 01C 700x20 00304 FVP", code: "SO0014761COR1C7020FVSP003", subDescription: "COR-LD-050-CP-DF-00-EN" },
      { description: "COR LD 01C 700x21 FVP", code: "SO0014762COR1C7021FVSS430", subDescription: "COR-LD-050-CP-DF-00-EN" },
      { description: "COR LD 01C 700x21 STD", code: "SO0014767COR1C7021STSS430", subDescription: "COR-LD-050-CP-DF-00-EN" },
      { description: "COR LD 01C 800x20 RBY", code: "SO0014767COR1C8020RBSS430", subDescription: "COR-LD-050-CP-DF-00-BS" },
      { description: "COR LD 01C 800x20 STD", code: "EX0000411COR1C8020STSP078", subDescription: "COR-LD-050-CP-DF-00-EN" },
      { description: "COR LD 01C 800x21 FVP", code: "SO0014757COR1C8021FVSS430", subDescription: "COR-LD-050-CP-DF-00-EN" },
      { description: "COR LD 01C 800x21 STD", code: "SO0014799COR1C8021STSS430", subDescription: "COR-LD-050-CP-DF-00-EN" },
      { description: "COR LD 01C 900x21 00304 FVP", code: "SO0014512COR1C9021FV00304", subDescription: "COR-LD-050-CP-DF-00-EN" }
    ],
    gallery: []
  },
  {
    id: 'core-cd',
    subcategoryId: 'core',
    name: 'CORE CD',
    code: 'CORE-CD',
    description: 'Car Door for CORE product set',
    image: 'https://images.unsplash.com/photo-1702483907449-7516bd7608a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGV2YXRvciUyMGNvbnRyb2wlMjBwYW5lbHxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 450, passengers: 6, speed: '1.0 m/s', buildingType: ['Residential'], usage: ['Low Traffic'], price: 8500,
    specifications: {
      doorType: 'Car Door',
      doorOpenType: ['C2', 'T2'],
      doorOpeningWidth: ['700', '800', '900', '1000'],
      doorHeight: ['2000', '2100', '2200'],
      grade: ['MS', 'SS304', 'SS441', 'SS430'],
      panelFinish: ['Cladded', 'DirectMS', 'DirectSS'],
      panelType: ['STD', 'SVP', 'FGD', 'HGD'],
      directSSThickness: ['1', '1.2', '1.5'],
      toeGuardHeight: ['300', '750'],
      toeGuardFinish: ['GI', 'MSPowder', 'CED'],
      safetyNorms: ['EN81-20', 'EN81-50', 'BS470', 'IS17900'],
      fireCertification: ['NFR'],
      driveType: ['ECO+', 'MIDI+'],
      runby: ['Yes', 'No'],
      glassFinishFGD: ['Standard', 'TintedGrey', 'TintedBrown'],
      couplerLock: ['WithLock', 'WithoutLock'],
      operatorFixing: ['FrontFixing', 'TopFixing'],
      lightCurtain: ['Static', 'Dynamic']
    },
    items: [
      { description: "COR CD 02C 700x20 FVP", code: "SO0014658COR2C7020FVSS430", subDescription: "COR-CD-WL-CP-S" },
      { description: "COR CD 02C 700x20 00304 FVP", code: "SO0014761COR2C7020FVSP003", subDescription: "COR-CD-WL-CP-S" },
      { description: "COR CD 02C 700x21 FVP", code: "SO0014762COR2C7021FVSS430", subDescription: "COR-CD-WL-CP-S" },
      { description: "COR CD 02C 800x21 FVP", code: "SO0014757COR2C8021FVSS430", subDescription: "COR-CD-WL-CP-S" },
      { description: "COR CD 02C 900x21 00304 FVP", code: "SO0014512COR2C9021FV00304", subDescription: "COR-CD-WL-CP-S" }
    ],
    gallery: []
  },
  // CORE MD Models
  {
    id: 'core-md-ld',
    subcategoryId: 'core-md',
    name: 'COREMD LD',
    code: 'COREMD-LD',
    description: 'Landing Door for COREMD product set',
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3MTkxNDE0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 1600, passengers: 21, speed: '1.6 m/s', buildingType: ['Hospital'], usage: ['Medical'], price: 18500,
    specifications: {
      doorType: 'Landing Door',
      doorOpenType: ['C2', 'T2'],
      doorOpeningWidth: ['700', '800', '900', '1000', '1100', '1200', '1300', '1400'],
      doorHeight: ['2000', '2100', '2200', '2300', '2400'],
      panelFinish: ['Cladded', 'DirectMS', 'DirectSS'],
      panelType: ['STD', 'SVP'],
      basePanelThicknessMS: ['0.6', '0.8', '1.2'],
      directSSThickness: ['1.2', '1.5', '1.6'],
      frameDimensions: ['50x40x50', '120x60x160'],
      frameBaseThickness: ['1.5'],
      toeGuardHeight: ['200'],
      toeGuardFinish: ['GI'],
      safetyNorms: ['EN81-20', 'EN81-50', 'BS470', 'IS17900'],
      fireCertification: ['EN81-20', 'EN81-50', 'IS17900'],
      runby: ['Yes', 'No'],
      groutPlate: ['Yes'],
      shipmentType: ['FullSupply'],
      closingMethod: ['Spring', 'ClosingRope', 'CounterWeight']
    },
    items: [
      { description: "CORMD LD 01C 100x24 STD", code: "SO0016681CMD1C1024STSS430", subDescription: "CMD-LD-050-CP-CF-" },
      { description: "CORMD LD 01C 100x24 00304 STD", code: "SO0016421CMD1C1024ST0304M", subDescription: "CMD-LD-050-CP-CF-" },
      { description: "CORMD LD 01C 110x20 00304 STD", code: "SO0017165CMD1C1120ST00304", subDescription: "CMD-LD-050-CP-CF-" }
    ],
    gallery: []
  },
  {
    id: 'core-md-cd',
    subcategoryId: 'core-md',
    name: 'COREMD CD',
    code: 'COREMD-CD',
    description: 'Car Door for COREMD product set',
    image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3MTkxNDE0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 1600, passengers: 21, speed: '1.6 m/s', buildingType: ['Hospital'], usage: ['Medical'], price: 18500,
    specifications: {
      doorType: 'Car Door',
      doorOpenType: ['C2', 'T2'],
      doorOpeningWidth: ['700', '800', '900', '1000', '1100', '1200', '1300', '1400'],
      doorHeight: ['2000', '2100', '2200', '2300', '2400'],
      directSSThickness: ['1.2', '1.5', '1.6'],
      toeGuardHeight: ['300', '750'],
      toeGuardFinish: ['GI', 'MSPowder', 'CED'],
      driveType: ['ECO+', 'MIDI+'],
      runby: ['Yes', 'No'],
      couplerLock: ['WithLock'],
      operatorFixing: ['FrontFixing', 'TopFixing'],
      lightCurtain: ['Static', 'Dynamic']
    },
    items: [
      { description: "CORMD CD 02C 100x24 STD", code: "SO0016681CMD2C1024STSS430001", subDescription: "CMD-CD-MID-CP-D" },
      { description: "CORMD CD 02C 100x24 00304 STD", code: "SO0016421CMD2C1024ST0304M", subDescription: "CMD-CD-MID-CP-D" },
      { description: "CORMD CD 02C 110x20 00304 STD", code: "SO0017165CMD2C1120ST00304", subDescription: "CMD-CD-ECO-CP-D" }
    ],
    gallery: []
  },
  // STELLAR Models
  {
    id: 'stellar-ld',
    subcategoryId: 'stellar',
    name: 'STELAR LD',
    code: 'STELAR-LD',
    description: 'Landing Door for STELAR product set',
    image: 'https://images.unsplash.com/photo-1565897188739-4c8130c58a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3lzY3JhcGVyJTIwZ2xhc3MlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 800, passengers: 10, speed: '2.5 m/s', buildingType: ['Luxury Residential'], usage: ['High Traffic'], price: 24500,
    specifications: {
      doorType: 'Landing Door',
      doorOpenType: ['C2', 'T2'],
      doorOpeningWidth: ['700', '800', '900'],
      doorHeight: ['2000', '2100'],
      panelFinish: ['Cladded', 'DirectMS'],
      panelType: ['STD', 'SVP', 'LVP', 'FGD'],
      basePanelThicknessMS: ['0.6', '0.8'],
      frameDimensions: ['50x40x50', '90x40x170'],
      frameBaseThickness: ['0.8'],
      toeGuardHeight: ['200'],
      toeGuardFinish: ['MSPowder'],
      safetyNorms: ['EN81-20', 'EN81-50', 'BS470', 'IS17900', 'IS14665'],
      fireCertification: ['NFR'],
      runby: ['No'],
      shipmentType: ['FullSupply', 'PartA', 'PartB'],
      closingMethod: ['Spring']
    },
    items: [
      { description: "STEL LD 01C 700x20 00304 FVP", code: "SO0017425STR1C7020FV0304M", subDescription: "STEL-LD-090-CP-CF-NTG" },
      { description: "STEL LD 01C 700x20 00304 STD", code: "SO0017043STR1C7020ST00304", subDescription: "STEL-LD-050-CP-CF-000" },
      { description: "STEL LD 01C 800x20 00304 FVP", code: "SO0017458STR1C8020FV00304", subDescription: "STEL-LD-090-CP-CF-NTG" }
    ],
    gallery: []
  },
  {
    id: 'stellar-cd',
    subcategoryId: 'stellar',
    name: 'STELAR CD',
    code: 'STELAR-CD',
    description: 'Car Door for STELAR product set',
    image: 'https://images.unsplash.com/photo-1565897188739-4c8130c58a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3lzY3JhcGVyJTIwZ2xhc3MlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 800, passengers: 10, speed: '2.5 m/s', buildingType: ['Luxury Residential'], usage: ['High Traffic'], price: 24500,
    specifications: {
      doorType: 'Car Door',
      doorOpenType: ['C2', 'T2'],
      doorOpeningWidth: ['700', '800', '900'],
      doorHeight: ['2000', '2100'],
      toeGuardHeight: ['300', '750'],
      driveType: ['ECO+'],
      runby: ['No'],
      couplerLock: ['WithoutLock'],
      operatorFixing: ['FrontFixing'],
      lightCurtain: ['Static']
    },
    items: [
      { description: "STEL CD 02C 700x20 00304 FVP", code: "SO0017425STR2C7020FV0304M", subDescription: "STEL-CD-NTG-CP-" },
      { description: "STEL CD 02C 700x20 00304 STD", code: "SO0017219STR2C7020ST00304", subDescription: "STEL-CD-000-CP-" },
      { description: "STEL CD 02C 800x20 00304 FVP", code: "SO0016789STR2C8020FV00304", subDescription: "STEL-CD-NTG-CP-" }
    ],
    gallery: []
  },
  // CABIN Models
  {
    id: 'cabin-standard',
    subcategoryId: 'cabin',
    name: 'CABIN Standard Series',
    code: 'CABIN-STD',
    description: 'Versatile cabin solution with multiple finish options',
    image: 'https://images.unsplash.com/photo-1770821030454-5e3ccb2d96dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvbWUlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 630,
    passengers: 8,
    speed: '1.0 m/s',
    buildingType: ['Residential', 'Commercial', 'Office'],
    usage: ['Low Traffic', 'Medium Traffic'],
    price: 15600,
    specifications: {
      loadCapacity: '630 kg',
      passengerCapacity: 8,
      carDimensions: '1400 x 1400 x 2200 mm',
      shaftDimensions: '1750 x 1750 mm',
      speed: '1.0 m/s',
      powerRequirement: '7.5 kW, 380V',
      safetyFeatures: ['LED lighting', 'Ventilation system', 'Emergency phone', 'Non-slip flooring'],
      installationType: 'Modular assembly',
      travelHeight: 'Up to 60m',
      doors: 'Compatible with all door systems'
    },
    gallery: [
      'https://images.unsplash.com/photo-1770821030454-5e3ccb2d96dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvbWUlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3MTkxNDE0N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  // SLING Models
  {
    id: 'sling-hd',
    subcategoryId: 'sling',
    name: 'SLING Heavy Duty',
    code: 'SLING-HD',
    description: 'Robust sling frame for commercial and industrial applications',
    image: 'https://images.unsplash.com/photo-1765048808260-9f48d96caf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbGlmdCUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzcxOTE0MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 1000,
    passengers: 13,
    speed: '1.6 m/s',
    buildingType: ['Commercial', 'Industrial', 'Office'],
    usage: ['Medium Traffic', 'High Traffic'],
    price: 9800,
    specifications: {
      loadCapacity: '1000 kg',
      passengerCapacity: 13,
      carDimensions: '1600 x 1600 x 2400 mm',
      shaftDimensions: '2000 x 2000 mm',
      speed: '1.6 m/s',
      powerRequirement: '11 kW, 380V',
      safetyFeatures: ['Reinforced steel frame', 'Anti-vibration mounts', 'Precision alignment', 'Corrosion resistant'],
      installationType: 'Structural mounting',
      travelHeight: 'Up to 100m',
      doors: 'Compatible with all door systems'
    },
    gallery: [
      'https://images.unsplash.com/photo-1765048808260-9f48d96caf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbGlmdCUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzcxOTE0MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1769734711473-6544be810904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVpZ2h0JTIwY2FyZ28lMjBsaWZ0fGVufDF8fHx8MTc3MTkxNDE0OHww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  // MECHANISM Models
  {
    id: 'mechanism-eco',
    subcategoryId: 'mechanism',
    name: 'MECHANISM EcoMotor',
    code: 'MECH-ECO',
    description: 'Energy-efficient drive system with regenerative technology',
    image: 'https://images.unsplash.com/photo-1769734711473-6544be810904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVpZ2h0JTIwY2FyZ28lMjBsaWZ0fGVufDF8fHx8MTc3MTkxNDE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 800,
    passengers: 10,
    speed: '2.0 m/s',
    buildingType: ['Commercial', 'Office', 'Residential'],
    usage: ['Medium Traffic', 'High Traffic'],
    price: 22400,
    specifications: {
      loadCapacity: '800 kg',
      passengerCapacity: 10,
      carDimensions: 'Compatible with standard cabins',
      shaftDimensions: 'Machine room less design',
      speed: '2.0 m/s',
      powerRequirement: '11 kW, 380V (40% energy saving)',
      safetyFeatures: ['Regenerative drive', 'Soft start/stop', 'Emergency lowering', 'Overspeed protection'],
      installationType: 'Machine Room Less (MRL)',
      travelHeight: 'Up to 80m',
      doors: 'Compatible with all systems'
    },
    gallery: [
      'https://images.unsplash.com/photo-1769734711473-6544be810904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVpZ2h0JTIwY2FyZ28lMjBsaWZ0fGVufDF8fHx8MTc3MTkxNDE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1765048808260-9f48d96caf98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbGlmdCUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzcxOTE0MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  // SYSTEM WITH Models
  {
    id: 'system-complete',
    subcategoryId: 'system-with',
    name: 'SYSTEM WITH Complete Package',
    code: 'SYS-W-FULL',
    description: 'All-inclusive lift system ready for installation',
    image: 'https://images.unsplash.com/photo-1544415224-e4b67cd64504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 630,
    passengers: 8,
    speed: '1.6 m/s',
    buildingType: ['Commercial', 'Office', 'Residential', 'Hotel'],
    usage: ['Medium Traffic', 'High Traffic'],
    price: 52000,
    specifications: {
      loadCapacity: '630 kg',
      passengerCapacity: 8,
      carDimensions: '1400 x 1400 x 2200 mm',
      shaftDimensions: '1750 x 1750 mm',
      speed: '1.6 m/s',
      powerRequirement: '11 kW, 380V, 3-phase',
      safetyFeatures: ['Complete safety package', 'Emergency brake', 'ARD ready', 'All sensors included', 'Fire service mode'],
      installationType: 'Turnkey solution',
      travelHeight: 'Up to 60m (20 floors)',
      doors: 'CORE doors included'
    },
    gallery: [
      'https://images.unsplash.com/photo-1544415224-e4b67cd64504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGV2YXRvciUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc3MTkxNDE0N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  // OL20 Models
  {
    id: 'ol20-compact',
    subcategoryId: 'ol20',
    name: 'OL20 Compact',
    code: 'OL20-C',
    description: 'Space-efficient overload system for modern buildings',
    image: 'https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzE4OTU5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capacity: 400,
    passengers: 5,
    speed: '1.0 m/s',
    buildingType: ['Residential', 'Small Commercial', 'Boutique'],
    usage: ['Low Traffic', 'Medium Traffic'],
    price: 19200,
    specifications: {
      loadCapacity: '400 kg',
      passengerCapacity: 5,
      carDimensions: '1000 x 1200 x 2100 mm',
      shaftDimensions: '1300 x 1500 mm',
      speed: '1.0 m/s',
      powerRequirement: '5.5 kW, 380V',
      safetyFeatures: ['Overload sensor', 'Compact design', 'MRL technology', 'Smart monitoring'],
      installationType: 'Machine Room Less (MRL)',
      travelHeight: 'Up to 30m (10 floors)',
      doors: 'Compatible with CORE doors'
    },
    gallery: [
      'https://images.unsplash.com/photo-1695067440629-b5e513976100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzE4OTU5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1770821030454-5e3ccb2d96dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGhvbWUlMjBlbGV2YXRvcnxlbnwxfHx8fDE3NzE5MTQxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  }
];

export const addons = [
  {
    id: 'ard',
    name: 'Automatic Rescue Device (ARD)',
    description: 'Emergency power system that safely moves the lift to the nearest floor during power outages',
    price: 4500,
    category: 'Safety'
  },
  {
    id: 'premium-cabin',
    name: 'Premium Cabin Finish',
    description: 'Luxury cabin interior with marble flooring, LED lighting, and premium wall panels',
    price: 8200,
    category: 'Aesthetics'
  },
  {
    id: 'smart-control',
    name: 'Smart Control Panel',
    description: 'Touchscreen control panel with destination selection and IoT integration',
    price: 3600,
    category: 'Technology'
  },
  {
    id: 'extra-sensors',
    name: 'Extra Safety Sensors',
    description: 'Advanced sensor package including infrared door sensors and anti-collision system',
    price: 2100,
    category: 'Safety'
  },
  {
    id: 'maintenance-basic',
    name: 'Basic Maintenance Package',
    description: '12-month preventive maintenance with quarterly inspections',
    price: 1800,
    category: 'Service'
  },
  {
    id: 'maintenance-premium',
    name: 'Premium Maintenance Package',
    description: '24-month comprehensive maintenance with monthly inspections and priority service',
    price: 4200,
    category: 'Service'
  },
  {
    id: 'glass-cabin',
    name: 'Glass Cabin Walls',
    description: 'Panoramic glass walls for scenic elevator experience',
    price: 12500,
    category: 'Aesthetics'
  },
  {
    id: 'air-purifier',
    name: 'HEPA Air Purification System',
    description: 'Medical-grade air filtration system with UV sterilization',
    price: 2800,
    category: 'Health'
  }
];
