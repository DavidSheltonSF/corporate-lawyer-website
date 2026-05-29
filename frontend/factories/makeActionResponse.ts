import { ActionResponse } from '@/types/ActionResponse';

export async function makeActionResponse<T>(res: Response): Promise<ActionResponse<T>> {
  try {
    const body = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: body.message || 'Unespected error',
        code: body.code,
        details: body.details,
        status: res.status,
      };
    }

    return {
      success: true,
      data: body.data,
      status: res.status,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Invalid server response',
      code: 'INVALID_RESPONSE',
      status: res.status,
    };
  }
}
