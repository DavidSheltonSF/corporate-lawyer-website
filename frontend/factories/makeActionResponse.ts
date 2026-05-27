import { ActionResponse } from '@/types/ActionResponse';

export async function makeActionResponse<T>(res: Response): Promise<ActionResponse<T>> {
  try {
    const json = await res.json();
    const { message, code, details, data } = json;
    if (!res.ok) {
      return { success: false, message: message || 'Unespected error', code, details };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: 'Invalid server response',
      code: 'INVALID_RESPONSE',
    };
  }
}
