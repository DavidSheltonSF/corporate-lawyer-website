export interface Page<T> {
  items: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    nextPage?: number | null;
  };
}
