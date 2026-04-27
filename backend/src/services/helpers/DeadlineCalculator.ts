import { BrazilianState } from '../../types/BrazilianState';
import { City } from '../../types/City';
import { HolidaysProvider } from '../HolidaysProvider';

export class DeadlineCalculator {
  constructor(private readonly holidaysProvider: HolidaysProvider) {}

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; //sunday = 0 saturday = 6
  }

  isHoliday(date: Date, state: BrazilianState, city: City): boolean {
    const dateString = date.toISOString();
    const formatted = dateString.split('T')[0] as string;
    const holidays = this.holidaysProvider.getLocalHolidays(state, city);
    return holidays.includes(formatted);
  }
}
