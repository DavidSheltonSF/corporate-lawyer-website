import { API_URL } from '@/config/api';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { mapLabelToDeadlineType } from '@/mapper/mapLabelToDeadlineType';
import { mapLabelToDeadlineCountintType } from '@/mapper/mapLabelToDeadlineCountingType';
import { mapLabelToDeadlinePriority } from '@/mapper/mapLabelToDeadlinePriority';
import { Deadline } from '@/types/Deadline';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function createDeadline(
  caseId: string,
  lawyerId: string,
  formData: FormData
): Promise<ActionResponse<WithId<Deadline>>> {
  const type = formData.get('type');
  const countingType = formData.get('countingType');
  const intimationDate = formData.get('intimationDate');
  const days = formData.get('days');
  const priority = formData.get('priority');
  const mappedCountingType = mapLabelToDeadlineCountintType(countingType?.toString() || '');
  const mappedType = mapLabelToDeadlineType(type?.toString() || '');

  const mappedPriority = mapLabelToDeadlinePriority(priority?.toString() || '');

  const response = await apiFetch(`${API_URL}/deadlines`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      caseId,
      lawyerId,
      type: mappedType,
      countingType: mappedCountingType,
      intimationDate,
      days,
      priority: mappedPriority,
    }),
  });

  return makeActionResponse(response);
}
