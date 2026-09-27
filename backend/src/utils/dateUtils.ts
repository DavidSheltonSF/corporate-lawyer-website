export function getToday() {
  return new Date();
}

export function getTomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

export function getYesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
}
