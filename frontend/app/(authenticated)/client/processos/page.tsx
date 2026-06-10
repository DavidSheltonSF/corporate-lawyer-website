import CaseSearch from '@/components/features/cases/CaseSearch';
import { Text } from '@/components/ui/Text';

export default function Processos() {
  return (
    <div className="flex flex-col gap-[24px]">
      <Text as={'h1'} variant="h1">
        Processos
      </Text>
      <CaseSearch />
    </div>
  );
}
