import ClientSearch from '@/components/features/clients/ClientSearch';

export default function Clientes() {
  return (
    <div className="flex flex-col gap-[24px]">
      <h1>Clientes</h1>
      <ClientSearch />
    </div>
  );
}
