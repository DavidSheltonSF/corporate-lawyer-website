import { Card } from '@/components/ui/Card/Card';
import { Text } from '@/components/ui/Text';
import { Case } from '@/types/Case';
import { WithId } from '@/types/WithId';

interface Props {
  caseData: WithId<Case>;
}
export function ClientCaseCard({ caseData }: Props) {
  const { id, title, description } = caseData;

  return (
    <Card key={id} className="w-full h-fit">
      <div className="flex flex-col gap-[8px] w-full border-[1px] p-[8px] rounded-[8px]">
        <Text as={'h3'} variant="h3" className="font-bold ">
          {title}
        </Text>
        <Text className="flex flex-col">{description}</Text>
      </div>
    </Card>
  );
}
