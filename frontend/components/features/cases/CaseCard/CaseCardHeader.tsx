import { Text } from '@/components/ui/Text';

interface Props {
  title: string;
  caseNumber: string;
}

export function CaseCardHeader({ title, caseNumber }: Props) {
  return (
    <header className="flex flex-col gap-[8px]">
      <Text as={'h3'} variant="h3" className="font-bold">
        {title}
      </Text>
      <Text variant="muted">nº {caseNumber}</Text>
    </header>
  );
}
