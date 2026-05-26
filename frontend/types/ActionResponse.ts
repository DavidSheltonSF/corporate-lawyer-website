export interface ActionResponse<T> {
  success: boolean;
  data?: T;
  code?: string;
  details?: any;
  message?: string;
}
