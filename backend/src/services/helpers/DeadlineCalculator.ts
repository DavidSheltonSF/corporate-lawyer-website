import { BrazilState } from '../../types/BrazilState';
import { City } from '../../types/City';
import { DeadlineCountingType } from '../../types/DeadlineCountingType';
import { HolidaysProvider } from '../HolidaysProvider';

export class DeadlineCalculator {
  constructor(
    private readonly holidaysProvider: HolidaysProvider,
    private readonly config: {
      state: BrazilState;
      city: City;
      countingType: DeadlineCountingType;
    }
  ) {}

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; //sunday = 0 saturday = 6
  }

  isHoliday(date: Date): boolean {
    const { state, city } = this.config;
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

  getStartDate(date: Date): Date {
    const { countingType } = this.config;
    if (countingType === DeadlineCountingType.DIAS_CORRIDOS) {
      const startDate = new Date(date);
      startDate.setDate(startDate.getDate() + 1);
      return startDate;
    }
    return this.getNextBusinessDay(date);
  }

  getDueDate(date: Date, days: number): Date {
    let current = new Date(date);
    const { countingType } = this.config;
    const countAllDays = countingType === DeadlineCountingType.DIAS_CORRIDOS;
    let i = 0;
    while (i < days) {
      current.setDate(current.getDate() + 1);
      if (countAllDays || this.isBusinessDay(current)) {
        i++;
      }
    }

    return current;
  }

}
