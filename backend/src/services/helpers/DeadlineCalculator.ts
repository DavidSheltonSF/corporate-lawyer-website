import { CaseLocation } from '../../types/CaseLocation';
import { DeadlineCountingType } from '../../types/DeadlineCountingType';
import { normalizeDate } from '../../utils/normalizeDate';
import { HolidaysProvider } from '../HolidaysProvider';

export class DeadlineCalculator {
  constructor(
    private readonly holidaysProvider: HolidaysProvider,
    public config?: { countingType: DeadlineCountingType; caseLocation: CaseLocation }
  ) {}

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; //sunday = 0 saturday = 6
  }

  isHoliday(date: Date): boolean {
    if (!this.config) {
      throw new Error('Missing config params');
    }
    const { caseLocation } = this.config;

    const { state, city } = caseLocation;
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
    if (!this.config) {
      throw new Error('Missing config params');
    }
    const { countingType } = this.config;
    if (countingType === DeadlineCountingType.DIAS_CORRIDOS) {
      const startDate = new Date(date);
      startDate.setDate(startDate.getDate() + 1);
      return startDate;
    }
    return this.getNextBusinessDay(date);
  }

  getDueDate(date: Date, days: number): Date {
    if (!this.config) {
      throw new Error('Missing config params');
    }
    const { countingType } = this.config;
    let current = normalizeDate(new Date(date));

    const countOnlyBusinessDays = countingType === DeadlineCountingType.DIAS_UTEIS;

    let addedDays = 1; // including start date
    while (addedDays < days) {
      current.setDate(current.getDate() + 1);
      if (countOnlyBusinessDays && !this.isBusinessDay(current)) {
        continue;
      }
      addedDays++;
    }

    return current;
  }

  getDeadlineDateRange(intimationDate: Date, days: number): { startDate: Date; dueDate: Date } {
    const startDate = this.getStartDate(intimationDate);
    const dueDate = this.getDueDate(startDate, days);
    return { startDate, dueDate };
  }

  getRemainingDays(dueDate: Date): number {
    let current = new Date();
    current.setHours(0, 0, 0, 0); //normalize hours

    let targetDate = new Date(dueDate);
    targetDate.setHours(23, 59, 59, 999); // the deadline ends in the end of the day
    const diff = targetDate.getTime() - current.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
