import { BrazilState } from '../../types/BrazilState';
import { City } from '../../types/City';
import { DeadlineCountingType } from '../../types/DeadlineCountingType';
import { createDate } from '../../utils/createDate';
import { BrazilHolidaysProvider } from '../BrazilHolidaysProvider';
import { DeadlineCalculator } from './DeadlineCalculator';

describe(`Testing ${DeadlineCalculator.name}`, () => {
  function makeSut() {
    const brazilHolidaysProvider = new BrazilHolidaysProvider();
    const deadlineCalculator = new DeadlineCalculator(brazilHolidaysProvider, {
      caseLocation: { state: BrazilState.RIO_DE_JANEIRO, city: City.BELFORD_ROXO },
      countingType: DeadlineCountingType.DIAS_UTEIS,
    });
    return { deadlineCalculator, brazilHolidaysProvider };
  }
  test('should return true if date is weekend and false if it is not', () => {
    const { deadlineCalculator } = makeSut();
    const sundayDate = createDate(2026, 4, 26);
    const mondayDate = createDate(2026, 4, 27);
    const date1 = deadlineCalculator.isWeekend(sundayDate);
    const date2 = deadlineCalculator.isWeekend(mondayDate);
    expect(date1).toBeTruthy();
    expect(date2).toBeFalsy();
  });

  test('should return true if date is a holiday and false if it is not', () => {
    const { deadlineCalculator } = makeSut();

    const holiday1 = createDate(2026, 1, 1);
    const holiday2 = createDate(2026, 2, 16);
    const notHoliday1 = createDate(2026, 4, 26);
    const notHoliday2 = createDate(2026, 4, 27);

    const result1 = deadlineCalculator.isHoliday(holiday1);
    const result2 = deadlineCalculator.isHoliday(holiday2);
    const result3 = deadlineCalculator.isHoliday(notHoliday1);
    const result4 = deadlineCalculator.isHoliday(notHoliday2);
    expect(result1).toBeTruthy();
    expect(result2).toBeTruthy();
    expect(result3).toBeFalsy();
    expect(result4).toBeFalsy();
  });

  test('should return true if date is a isBusinessDay and false if it is not', () => {
    const { deadlineCalculator } = makeSut();

    const weekend = createDate(2026, 4, 26);
    const holiday = createDate(2026, 2, 16);
    const businessDay1 = createDate(2026, 4, 27);
    const businessDay2 = createDate(2026, 4, 28);

    const result1 = deadlineCalculator.isBusinessDay(weekend);
    const result2 = deadlineCalculator.isBusinessDay(holiday);
    const result3 = deadlineCalculator.isBusinessDay(businessDay1);
    const result4 = deadlineCalculator.isBusinessDay(businessDay2);
    expect(result1).toBeFalsy();
    expect(result2).toBeFalsy();
    expect(result3).toBeTruthy();
    expect(result4).toBeTruthy();
  });

  test('should return the next business day', () => {
    const { deadlineCalculator } = makeSut();
    const date1 = createDate(2026, 4, 26);
    const date2 = createDate(2026, 5, 1);

    const result1 = deadlineCalculator.getNextBusinessDay(date1);

    const result2 = deadlineCalculator.getNextBusinessDay(date2);

    expect(result1.toISOString()).toBe(createDate(2026, 4, 27).toISOString());
    expect(result2.toISOString()).toBe(createDate(2026, 5, 4).toISOString());
  });

  test('should return the deadline duedate skiping weekends and holidays', () => {
    const { deadlineCalculator } = makeSut();
    const date = createDate(2026, 5, 1);
    const result = deadlineCalculator.getDueDate(date, 5);
    expect(result.toISOString()).toBe(createDate(2026, 5, 8).toISOString());
  });

  test('should return the deadline duedate not skiping weekends nor holidays', () => {
    const { brazilHolidaysProvider } = makeSut();

    const deadlineCalculator = new DeadlineCalculator(brazilHolidaysProvider, {
      caseLocation: { state: BrazilState.RIO_DE_JANEIRO, city: City.BELFORD_ROXO },
      countingType: DeadlineCountingType.DIAS_CORRIDOS,
    });

    const startDate = createDate(2026, 5, 2);
    const result = deadlineCalculator.getDueDate(startDate, 5);
    expect(result.toISOString()).toBe(createDate(2026, 5, 6).toISOString());
  });

  test('should return the startDate and the dueDate properly, skiping weekend and holidays', () => {
    const { brazilHolidaysProvider } = makeSut();

    const deadlineCalculator = new DeadlineCalculator(brazilHolidaysProvider, {
      caseLocation: { state: BrazilState.RIO_DE_JANEIRO, city: City.BELFORD_ROXO },
      countingType: DeadlineCountingType.DIAS_UTEIS,
    });

    const intimationDate = createDate(2026, 5, 1);
    const { startDate, dueDate } = deadlineCalculator.getDeadlineDateRange(intimationDate, 5);

    expect(startDate.toISOString()).toBe(createDate(2026, 5, 4).toISOString());
    expect(dueDate.toISOString()).toBe(createDate(2026, 5, 8).toISOString());
  });

  test('should return the startDate and the dueDate properly, not skiping weekend nor holidays', () => {
    const { brazilHolidaysProvider } = makeSut();

    const deadlineCalculator = new DeadlineCalculator(brazilHolidaysProvider, {
      caseLocation: { state: BrazilState.RIO_DE_JANEIRO, city: City.BELFORD_ROXO },
      countingType: DeadlineCountingType.DIAS_CORRIDOS,
    });

    const intimationDate = createDate(2026, 5, 1);
    const { startDate, dueDate } = deadlineCalculator.getDeadlineDateRange(intimationDate, 5);

    expect(startDate.toISOString()).toBe(createDate(2026, 5, 2).toISOString());
    expect(dueDate.toISOString()).toBe(createDate(2026, 5, 6).toISOString());
  });

  test('should return the remaining days properly given a dueDate', () => {
    const { brazilHolidaysProvider } = makeSut();

    const deadlineCalculator = new DeadlineCalculator(brazilHolidaysProvider, {
      caseLocation: { state: BrazilState.RIO_DE_JANEIRO, city: City.BELFORD_ROXO },
      countingType: DeadlineCountingType.DIAS_UTEIS,
    });

    const remainingDays = deadlineCalculator.getRemainingDays(createDate(2026, 5, 25));
    console.log(remainingDays);
  });
});
