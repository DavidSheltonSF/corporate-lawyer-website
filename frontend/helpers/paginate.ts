export function paginate(items: any[], page: number, limit: number) {
  // If the items quantity does not overflow the limit, the pagination is not necessary
  if (items.length <= limit) {
    return items;
  }
  const start = (page - 1) * limit;
  const end = start + limit;
  return items.slice(start, end);
}
