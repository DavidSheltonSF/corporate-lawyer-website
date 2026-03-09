export interface Pagination<T> {
  items: T[];
  total: number;
  totalPages: number;
}
