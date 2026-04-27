import { HolidaysProvider } from '../HolidaysProvider';

export class DeadlineCalculator {
  constructor(private readonly holydaysProvider: HolidaysProvider) {}

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; //sunday = 0 saturday = 6
  }
}
