import { InvalidDateError } from '../../errors/domain/InvalidDateError';

export function validateDate(dateString: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    throw new InvalidDateError(dateString);
  }

  const [year, month, day] = dateString.split('-').map(Number);
  if (
    year === undefined ||
    month === undefined ||
    day === undefined ||
    isNaN(Number(year)) ||
    isNaN(Number(month)) ||
    isNaN(Number(day))
  ) {
    throw new InvalidDateError(dateString);
  }

  if (day < 1 || day > 31 || month < 1 || month > 12) {
    throw new InvalidDateError(dateString);
  }

  // Decreace 1 from month for local-safe parsing
  const date = new Date(year, month - 1, day);

  // Check if the data string provided matches the Date object created
  // OBS: If invalid data, with a righ format like (2025-02-29) is provided, JavaScript
  // will silently fix the data, so the data string and the Data object will not match
  // throwig the error bellow
  if (year !== date.getFullYear() || month !== date.getMonth() + 1 || day !== date.getDate()) {
    throw new InvalidDateError(dateString);
  }
}
