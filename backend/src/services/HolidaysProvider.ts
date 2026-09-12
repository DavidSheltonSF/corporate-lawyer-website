import { BrazilState } from '../types/BrazilState.js';
import { City } from '../types/City.js';

export interface HolidaysProvider {
  getLocalHolidays(state: BrazilState, city: City): string[];
}
