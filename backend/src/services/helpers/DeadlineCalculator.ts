import { CaseLocation } from '../../types/CaseLocation';
import { DeadlineCountingType } from '../../types/DeadlineCountingType';
import { HolidaysProvider } from '../HolidaysProvider';

export class DeadlineCalculator {
  constructor(
    private readonly holidaysProvider: HolidaysProvider,
    public config: { countingType: DeadlineCountingType; caseLocation?: CaseLocation }
  ) {}

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; //sunday = 0 saturday = 6
  }

  isHoliday(date: Date): boolean {
    const { caseLocation } = this.config;
    if (!caseLocation) {
      throw new Error('Missing config params');
    }
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
    const { countingType } = this.config;
    if (countingType === DeadlineCountingType.DIAS_CORRIDOS) {
      const startDate = new Date(date);
      startDate.setDate(startDate.getDate() + 1);
      return startDate;
    }
    return this.getNextBusinessDay(date);
  }

  getDueDate(date: Date, days: number): Date {
    const { countingType } = this.config;
    let current = new Date(date);

    const countAllDays = countingType === DeadlineCountingType.DIAS_CORRIDOS;

    let addedDays = 1; // including start date
    while (addedDays < days) {
      if (countAllDays || this.isBusinessDay(current)) {
        addedDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return current;
  }

  getDeadlineDateRange(intimationDate: Date, days: number): { startDate: Date; dueDate: Date } {
    const startDate = this.getStartDate(intimationDate);
    const dueDate = this.getDueDate(startDate, days);
    return { startDate, dueDate };
  }

  getRemainingDays(dueDate: Date): number {
    const { countingType } = this.config;

    const countOnlyBusinessDays = countingType === DeadlineCountingType.DIAS_UTEIS;

    let current = new Date();
    current.setHours(0, 0, 0, 0); //normalize hours

    let targetDate = new Date(dueDate);
    targetDate.setHours(0, 0, 0, 0); //normalize hours

    if (!countOnlyBusinessDays) {
      const diff = targetDate.getTime() - current.getTime();

      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    let daysCount = 0;
    while (current < targetDate) {
      current.setDate(current.getDate() + 1);

      if (countOnlyBusinessDays && !this.isBusinessDay(current)) {
        continue;
      }
      daysCount++;
    }

    return daysCount;
  }
}
