import { Text } from '@/components/ui/Text';

interface Props {
  title: string;
  processNumber: string;
}

export function CaseCardHeader({ title, processNumber }: Props) {
  return (
    <header className="flex flex-col gap-[8px]">
      <Text as={'h3'} variant="h3" className="font-bold">
        {title}
      </Text>
      <Text variant="muted">nº {processNumber}</Text>
    </header>
  );
}
