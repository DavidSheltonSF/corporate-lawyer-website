import { describe, expect, it } from 'vitest';
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
  describe('isWeekend', () => {
    it('should return true if date is weekend and false if it is not', () => {
      const { deadlineCalculator } = makeSut();
      const sundayDate = createDate(2026, 9, 6);
      const mondayDate = createDate(2026, 9, 7);
      const date1 = deadlineCalculator.isWeekend(sundayDate);
      const date2 = deadlineCalculator.isWeekend(mondayDate);
      expect(date1).toBeTruthy();
      expect(date2).toBeFalsy();
    });
  });

  describe('isHoliday', () => {
    it('should return true if date is a holiday and false if it is not', () => {
      const { deadlineCalculator } = makeSut();

      // Dia da Independência
      const holiday2 = createDate(2026, 9, 7);
      // Dia das Crianças
      const holiday1 = createDate(2026, 10, 12);

      const notHoliday1 = createDate(2026, 9, 6);
      const notHoliday2 = createDate(2026, 10, 13);

      const result1 = deadlineCalculator.isHoliday(holiday1);
      const result2 = deadlineCalculator.isHoliday(holiday2);
      const result3 = deadlineCalculator.isHoliday(notHoliday1);
      const result4 = deadlineCalculator.isHoliday(notHoliday2);
      expect(result1).toBeTruthy();
      expect(result2).toBeTruthy();
      expect(result3).toBeFalsy();
      expect(result4).toBeFalsy();
    });
  });

  describe('isBusinessDay', () => {
    it('should return true if date is a isBusinessDay and false if it is not', () => {
      const { deadlineCalculator } = makeSut();

      const weekend = createDate(2026, 9, 6);
      // Dia da Independência
      const holiday = createDate(2026, 9, 7);

      const businessDay1 = createDate(2026, 9, 8);
      const businessDay2 = createDate(2026, 9, 9);

      const result1 = deadlineCalculator.isBusinessDay(weekend);
      const result2 = deadlineCalculator.isBusinessDay(holiday);
      const result3 = deadlineCalculator.isBusinessDay(businessDay1);
      const result4 = deadlineCalculator.isBusinessDay(businessDay2);
      expect(result1).toBeFalsy();
      expect(result2).toBeFalsy();
      expect(result3).toBeTruthy();
      expect(result4).toBeTruthy();
    });
  });

  describe('getNextBusinessDay', () => {
    it('should return the next business day', () => {
      const { deadlineCalculator } = makeSut();

      // Dia anterior ao Dia da Independência (2026-09-07)
      const date = createDate(2026, 9, 6);
      const nextBusinessDay = createDate(2026, 9, 8);

      const result = deadlineCalculator.getNextBusinessDay(date);

      expect(result.toISOString()).toBe(nextBusinessDay.toISOString());
    });
  });

  describe('getStartDate', () => {
    it('should return the start date  skiping weekends and holidays', () => {
      const { deadlineCalculator } = makeSut();
      const date = createDate(2026, 9, 6);
      const nextBusinessDay = createDate(2026, 9, 8);

      const result = deadlineCalculator.getStartDate(date);
      expect(result.toISOString()).toBe(nextBusinessDay.toISOString());
    });
  });

  describe('getDueDate', () => {
    it('should return the deadline duedate skiping weekends and holidays', () => {
      const { deadlineCalculator } = makeSut();
      const startDate = createDate(2026, 9, 8);
      const days = 5;
      const expectedDueDate = createDate(2026, 9, 14);

      const result = deadlineCalculator.getDueDate(startDate, days);
      expect(result.toISOString()).toBe(expectedDueDate.toISOString());
    });

    it('should return the deadline duedate not skiping weekends nor holidays', () => {
      const { brazilHolidaysProvider } = makeSut();

      const deadlineCalculator = new DeadlineCalculator(brazilHolidaysProvider, {
        caseLocation: { state: BrazilState.RIO_DE_JANEIRO, city: City.BELFORD_ROXO },
        countingType: DeadlineCountingType.DIAS_CORRIDOS,
      });

      const startDate = createDate(2026, 9, 8);
      const days = 5;
      const expectedDueDate = createDate(2026, 9, 12);

      const result = deadlineCalculator.getDueDate(startDate, days);
      expect(result.toISOString()).toBe(expectedDueDate.toISOString());
    });
  });

  describe('getDeadlineDateRange', () => {
    it('should return the startDate and the dueDate properly, skiping weekend and holidays', () => {
      const { deadlineCalculator } = makeSut();

      const intimationDate = createDate(2026, 9, 6);
      const days = 5;
      const expectedStartDate = createDate(2026, 9, 8);
      const expectedDueDate = createDate(2026, 9, 14);

      const { startDate, dueDate } = deadlineCalculator.getDeadlineDateRange(intimationDate, days);
      expect(startDate.toISOString()).toBe(expectedStartDate.toISOString());
      expect(dueDate.toISOString()).toBe(expectedDueDate.toISOString());
    });

    it('should return the startDate and the dueDate properly, not skiping weekend nor holidays', () => {
      const { brazilHolidaysProvider } = makeSut();

      const deadlineCalculator = new DeadlineCalculator(brazilHolidaysProvider, {
        caseLocation: { state: BrazilState.RIO_DE_JANEIRO, city: City.BELFORD_ROXO },
        countingType: DeadlineCountingType.DIAS_CORRIDOS,
      });

      const intimationDate = createDate(2026, 9, 6);
      const days = 5;
      const expectedStartDate = createDate(2026, 9, 7);
      const expectedDueDate = createDate(2026, 9, 11);
      const { startDate, dueDate } = deadlineCalculator.getDeadlineDateRange(intimationDate, days);

      expect(startDate.toISOString()).toBe(expectedStartDate.toISOString());
      expect(dueDate.toISOString()).toBe(expectedDueDate.toISOString());
    });
  });

  describe('getRemainingDays', () => {
    it('should return the remaining days properly given a dueDate, considering only business days', () => {
      const { deadlineCalculator } = makeSut();

      const dueDate = createDate(2026, 9, 12);
      const expectedRemainingDays = 7;

      const remainingDays = deadlineCalculator.getRemainingDays(dueDate);
      expect(remainingDays).toBe(expectedRemainingDays);
    });
  });
});
