export class EstimatorModel {
  static occupancyProfiles = {
    commercial: {
      name: 'Commercial High-Rise / Corporate HQ',
      hazard: 'Light to Ordinary Hazard',
      sprinklerDensity: 0.15,
      sprinklerCoveragePerHead: 130,
      basePumpGpm: 500,
      pumpDurationMinutes: 60,
    },
    pharma: {
      name: 'Pharmaceutical Plant / Cleanrooms',
      hazard: 'Ordinary Hazard Group 2',
      sprinklerDensity: 0.20,
      sprinklerCoveragePerHead: 100,
      basePumpGpm: 750,
      pumpDurationMinutes: 90,
    },
    textile: {
      name: 'Textile / Garments Manufacturing Mill',
      hazard: 'Extra Hazard Group 1 (High Fuel Load)',
      sprinklerDensity: 0.30,
      sprinklerCoveragePerHead: 90,
      basePumpGpm: 1000,
      pumpDurationMinutes: 120,
    },
    residential: {
      name: 'Multi-Storied Residential Tower',
      hazard: 'Light Hazard',
      sprinklerDensity: 0.10,
      sprinklerCoveragePerHead: 150,
      basePumpGpm: 500,
      pumpDurationMinutes: 45,
    },
    chemical: {
      name: 'Chemical Plant / Flammable Liquid Storage',
      hazard: 'High Hazard / Flammable',
      sprinklerDensity: 0.35,
      sprinklerCoveragePerHead: 80,
      basePumpGpm: 1500,
      pumpDurationMinutes: 120,
    }
  };

  static calculateEngineeringEstimate({ occupancyKey = 'commercial', totalSqFt = 50000, floors = 10 }) {
    const profile = this.occupancyProfiles[occupancyKey] || this.occupancyProfiles.commercial;
    const sqFt = Math.max(1000, Number(totalSqFt) || 50000);
    const numFloors = Math.max(1, Number(floors) || 1);

    const totalSprinklers = Math.ceil(sqFt / profile.sprinklerCoveragePerHead);

    let recommendedPumpGpm = profile.basePumpGpm;
    if (sqFt > 150000 || numFloors > 15) {
      recommendedPumpGpm = Math.max(recommendedPumpGpm, 1500);
    } else if (sqFt > 80000 || numFloors > 10) {
      recommendedPumpGpm = Math.max(recommendedPumpGpm, 1000);
    } else if (sqFt > 40000 || numFloors > 6) {
      recommendedPumpGpm = Math.max(recommendedPumpGpm, 750);
    }

    const requiredGallons = recommendedPumpGpm * profile.pumpDurationMinutes;
    const requiredLiters = Math.round(requiredGallons * 3.78541);

    const recommendedRisers = Math.max(1, Math.ceil(numFloors / 12) + (sqFt > 100000 ? 1 : 0));
    const hoseCabinets = numFloors * recommendedRisers * 2;
    const fireDoors = numFloors * 2;

    return {
      occupancyName: profile.name,
      hazardLevel: profile.hazard,
      pumpGpm: recommendedPumpGpm,
      pumpDurationMinutes: profile.pumpDurationMinutes,
      reservoirGallons: requiredGallons.toLocaleString(),
      reservoirLiters: requiredLiters.toLocaleString(),
      sprinklerHeads: totalSprinklers.toLocaleString(),
      risers: recommendedRisers,
      hoseCabinets: hoseCabinets,
      fireDoors: fireDoors,
      estimatedPressurePsi: numFloors > 12 ? '175 - 250 PSI' : '120 - 160 PSI'
    };
  }
}
