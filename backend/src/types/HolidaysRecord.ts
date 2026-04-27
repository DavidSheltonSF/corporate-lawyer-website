import { BrazilianState } from './BrazilianState';
import { City } from './City';

export interface HolidaysRecord {
  national: string[];
  states: Record<BrazilianState, string[]>;
  cities: Record<City, string[]>;
}
