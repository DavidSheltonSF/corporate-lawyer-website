import { BrazilianState } from '../types/BrazilianState';
import { City } from '../types/City';

export interface HolidaysProvider {
  getLocalHolidays(state: BrazilianState, city: City): string[];
}
