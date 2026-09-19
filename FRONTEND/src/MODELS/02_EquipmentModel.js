export const equipmentCatalog = [
  {
    id: 'eq-1',
    name: 'UL Listed Horizontal Split Case Fire Pump',
    brand: 'Patterson / NAFFCO',
    standard: 'NFPA 20, UL 448, FM 1311',
    capacity: '750 to 2000 US GPM',
    pressure: '100 - 300 PSI Working Pressure',
    driver: 'Electric Motor & Heavy Duty Diesel Engine',
    category: 'Fire Pumps',
    image: '/images/hero.jpg',
    description: 'Single-skid mounted assembly with dual drive engines and complete NFPA 20 factory run testing.'
  },
  {
    id: 'eq-2',
    name: 'Industrial Power Generator & Acoustic Canopy',
    brand: 'Cummins / Perkins / Clarke',
    standard: 'ISO 8528, BS 5514, NFPA 110',
    capacity: '100 kVA to 2500 kVA Continuous Prime',
    pressure: 'Soundproof 68 dBA @ 7m',
    driver: 'Turbocharged Intercooled Diesel Engine',
    category: 'Mechanical',
    image: '/images/generator.jpg',
    description: 'Heavy duty backup power generation for continuous factory operations and emergency fire pump feeds.'
  },
  {
    id: 'eq-3',
    name: 'Alarm Check Valve Station with Retard Chamber',
    brand: 'NAFFCO / SRI / Shield',
    standard: 'UL Listed & FM Approved',
    capacity: 'DN100 - DN200 Flanged End',
    pressure: '300 PSI (20.7 Bar)',
    driver: 'Hydraulic Retard Chamber & Water Motor Gong',
    category: 'Valves & Sprinklers',
    image: '/images/valves.jpg',
    description: 'Actuates mechanical alarm gong upon water flow and prevents backflow in automatic sprinkler networks.'
  },
  {
    id: 'eq-4',
    name: 'Atrium High-Ceiling Fire Sprinkler Network',
    brand: 'Viking / Tyco / Reliable',
    standard: 'NFPA 13, UL Listed, FM Approved',
    capacity: 'K-Factor 5.6 / 8.0 / 11.2 / 14.0 ESFR',
    pressure: '175 PSI Maximum Working Pressure',
    driver: 'Quick Response Frangible Glass Bulb',
    category: 'Valves & Sprinklers',
    image: '/images/sprinklers.jpg',
    description: 'Early Suppression Fast Response (ESFR) and standard pendent/upright sprinkler head networks.'
  },
  {
    id: 'eq-5',
    name: 'Clean Agent FM-200 / HFC-227ea Gas Suppression',
    brand: 'NAFFCO / Honeywell / Fike',
    standard: 'NFPA 2001, UL Listed, ISO 14520',
    capacity: 'Rapid Total Flooding in < 10 Seconds',
    pressure: '25 Bar / 42 Bar Seamless Steel Cylinders',
    driver: 'Electric Solenoid Actuator & Pneumatic Slave',
    category: 'Gas Suppression',
    image: '/images/suppression.jpg',
    description: 'Colorless, zero-residue clean agent engineered for mission-critical server rooms and data centers.'
  },
  {
    id: 'eq-6',
    name: 'Central LPG Reticulation Manifold Station',
    brand: 'Engineering Solutions / Daelim',
    standard: 'NFPA 58 & BD Gas Safety Rules',
    capacity: '8 to 32 Cylinder Dual Bank Manifold',
    pressure: 'Auto Changeover 1.5 Bar Regulator',
    driver: 'Integrated Solenoid Emergency Shut-Off Valve',
    category: 'LPG Systems',
    image: '/images/lpg.jpg',
    description: 'Central gas cylinder manifold piping with telemetry digital gas meters for multi-storied residential towers.'
  },
  {
    id: 'eq-7',
    name: 'Heavy Industrial Steam & Thermal Boiler',
    brand: 'Engineering Solutions Partner',
    standard: 'ASME Boiler Code & Chief Inspector BD',
    capacity: '1 Ton/h to 10 Ton/h Steam Output',
    pressure: 'Up to 16 Bar Operating Pressure',
    driver: 'Gas / Diesel / Dual Fuel Modulating Burner',
    category: 'Mechanical',
    image: '/images/boiler.jpg',
    description: 'Heavy duty fire-tube steam boiler for pharmaceutical, textile dyeing, and chemical processing plants.'
  },
  {
    id: 'eq-8',
    name: 'UL Certified Steel Fire Rated Exit Door',
    brand: 'NAFFCO / Engineering Solutions',
    standard: 'UL 10C, NFPA 80, BS 476 Part 22',
    capacity: '120 to 180 Minutes Fire Resistance',
    pressure: 'Panic Hardware & Heavy Duty Closer',
    driver: 'Double Leaf Steel with Vision Panel',
    category: 'Valves & Sprinklers',
    image: '/images/fire_door.jpg',
    description: 'Tested steel emergency exit doors preventing fire and toxic smoke spread along fire escape stairs.'
  }
];

export class EquipmentModel {
  static getAllEquipment() {
    return equipmentCatalog;
  }

  static getCategories() {
    return ['All', 'Fire Pumps', 'Valves & Sprinklers', 'Gas Suppression', 'LPG Systems', 'Mechanical'];
  }

  static filterEquipment(category = 'All') {
    if (category === 'All') return equipmentCatalog;
    return equipmentCatalog.filter((item) => item.category === category);
  }
}
