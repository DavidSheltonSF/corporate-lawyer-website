export type ActionResponse<T> =
  | { success: true; data?: T }
  | { success: false; message: string; code: string; details?: any };
