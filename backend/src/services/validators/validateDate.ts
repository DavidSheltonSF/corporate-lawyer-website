import { InvalidDateError } from '../../errors/domain/InvalidDateError';

export function validateDate(dateString: string) {
  const formattedDate = dateString.split('T')[0] as string;

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(formattedDate)) {
    throw new InvalidDateError(formattedDate);
  }

  const [year, month, day] = formattedDate.split('-').map(Number);
  if (
    year === undefined ||
    month === undefined ||
    day === undefined ||
    isNaN(Number(year)) ||
    isNaN(Number(month)) ||
    isNaN(Number(day))
  ) {
    throw new InvalidDateError(formattedDate);
  }

  if (day < 1 || day > 31 || month < 1 || month > 12) {
    throw new InvalidDateError(formattedDate);
  }

  // Decreace 1 from month for local-safe parsing
  const date = new Date(year, month - 1, day);

  // Check if the data string provided matches the Date object created
  // OBS: If invalid data, with a righ format like (2025-02-29) is provided, JavaScript
  // will silently fix the data, so the data string and the Data object will not match
  // throwig the error bellow
  if (year !== date.getFullYear() || month !== date.getMonth() + 1 || day !== date.getDate()) {
    throw new InvalidDateError(formattedDate);
  }
}
