import ClientSearch from '@/components/features/clients/ClientSearch';
import { Text } from '@/components/ui/Text';

export default function Clientes() {
  return (
    <div className="flex flex-col gap-[24px]">
      <Text as={'h1'} variant='h1'>Clientes</Text>
      <ClientSearch />
    </div>
  )
}
