import { EstimatorModel } from '../MODELS/03_EstimatorModel';

export class EstimatorController {
  static getOccupancyOptions() {
    return Object.entries(EstimatorModel.occupancyProfiles).map(([key, val]) => ({
      key,
      name: val.name,
      hazard: val.hazard
    }));
  }

  static calculate(formData) {
    return EstimatorModel.calculateEngineeringEstimate(formData);
  }
}
