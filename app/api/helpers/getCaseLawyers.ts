import { fakeUserDatabase } from '@/app/api/fakeDatabase/users';
import { lawyerBasicInfoProps } from '@/types/lawyerBasicInfoProps';
import { WithId } from '@/types/WithId';

export function getCaseLawyers(
  lawyersIds: string[]
): WithId<lawyerBasicInfoProps>[] | null {
  let lawyers: any[] = [];

  lawyersIds.forEach((id) => {
    const lawyer = fakeUserDatabase.find((user) => user.id === id);
    lawyers.push({ id: lawyer?.id, firstName: lawyer?.firstName, lastName: lawyer?.lastName });
  });

  if (lawyers.length === 0) return null;

  return lawyers;
}
