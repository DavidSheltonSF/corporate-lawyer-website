import { API_URL } from '@/config/api';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { Deadline } from '@/types/Deadline';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function createDeadline(
  caseId: string,
  lawyerId: string,
  formData: Record<string, string>
): Promise<ActionResponse<WithId<Deadline>>> {
  const type = formData.type;
  const countingType = formData.countingType;
  const intimationDate = formData.intimationDate;
  const days = formData.days;
  const priority = formData.priority;

  const response = await apiFetch(`${API_URL}/deadlines`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      caseId,
      lawyerId,
      type,
      countingType,
      intimationDate,
      days,
      priority,
    }),
  });

  return makeActionResponse(response);
}
