import { BrazilState } from '../types/BrazilState';
import { City } from '../types/City';

export interface HolidaysProvider {
  getLocalHolidays(state: BrazilState, city: City): string[];
}
