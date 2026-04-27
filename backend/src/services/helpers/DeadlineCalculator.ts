import { BrazilianState } from '../../types/BrazilianState';
import { City } from '../../types/City';
import { HolidaysProvider } from '../HolidaysProvider';

export class DeadlineCalculator {
  constructor(
    private readonly holidaysProvider: HolidaysProvider,
    private readonly caseLocalization: { state: BrazilianState; city: City }
  ) {}

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; //sunday = 0 saturday = 6
  }

  isHoliday(date: Date): boolean {
    const { state, city } = this.caseLocalization;
    const dateString = date.toISOString();
    const formatted = dateString.split('T')[0] as string;
    const holidays = this.holidaysProvider.getLocalHolidays(state, city);
    return holidays.includes(formatted);
  }

  isBusinessDay(date: Date): boolean {
    return !this.isWeekend(date) && !this.isHoliday(date);
  }

  getNextBusinessDay(date: Date): Date {
    let currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);

    while (!this.isBusinessDay(currentDate)) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return currentDate;
  }

  getDueDate(date: Date, days: number): Date {
    let current = new Date(date);

    let i = 0;
    while (i < days) {
      current.setDate(current.getDate() + 1);
      if (this.isBusinessDay(current)) {
        i++;
      }
    }

    return current;
  }
}
