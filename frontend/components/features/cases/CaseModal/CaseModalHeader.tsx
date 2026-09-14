import { Text } from '@/components/ui/Text';

interface Props {
  title?: string;
  caseNumber?: string;
}

export function CaseModalHeader({ title, caseNumber }: Props) {
  return (
    <header className="flex flex-col gap-[8px] w-full p-[24px] border-divider">
      <Text as={'h1'} variant="h1">
        {title}
      </Text>
      <div className="flex flex-1">
        <Text variant="muted">nº {caseNumber}</Text>
      </div>
    </header>
  );
}
