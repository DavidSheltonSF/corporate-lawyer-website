export type ActionResponse<T> =
  | { success: true; data: T; status: number }
  | { success: false; message: string; code: string; details?: any; status: number };
