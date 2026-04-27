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

  isBusinessDay(date: Date, state: BrazilianState, city: City): boolean {
    return !this.isWeekend(date) && !this.isHoliday(date, state, city);
  }

  getNextBusinessDay(date: Date, state: BrazilianState, city: City): Date {
    let currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);

    while (!this.isBusinessDay(currentDate, state, city)) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return currentDate;
  }
}
