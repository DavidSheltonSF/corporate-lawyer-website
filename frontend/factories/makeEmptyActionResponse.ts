import { ActionResponse } from '@/types/ActionResponse';

export async function makeEmptyActionResponse<T>(res: Response): Promise<ActionResponse<null>> {
  let body: any = null;

  try {
    body = await res.json();
  } catch {}

  if (!res.ok) {
    return {
      success: false,
      code: body?.code || 'REQUEST_FAILED',
      message: body?.message || 'Something went wrong',
      details: body?.details,
      status: res.status,
    };
  }

  return { success: true, data: null, status: res.status };
}
