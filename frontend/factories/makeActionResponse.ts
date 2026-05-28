import { ActionResponse } from '@/types/ActionResponse';

export async function makeActionResponse<T>(res: Response): Promise<ActionResponse<T | null>> {
  let body: any = null;
  try {
    if (res.status !== 204) {
      body = await res.json();
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Invalid server response',
      code: 'INVALID_RESPONSE',
    };
  }

  if (!res.ok) {
    return {
      success: false,
      message: body?.message || 'Unespected error',
      code: body?.code,
      details: body?.details,
    };
  }

  return {
    success: true,
    data: body?.data ?? null,
  };
}
