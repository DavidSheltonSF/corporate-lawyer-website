import { FieldValue } from '@/components/FieldValue';
import { formatStringList } from '@/lib/formatStringList';
import { fetchCaseById } from '@/services/fetchCaseById';

export default async function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const caseData = await fetchCaseById(id, ['lawyers', 'client']);
  const { processNumber, title, status, lawyers, client, court, courtDivision, description} = caseData;
  const lawyersNames: string[] = [];
  lawyers?.forEach((lawyer) => {
    lawyersNames.push(`${lawyer.firstName} ${lawyer.lastName}`);
  });
  return (
    <div className="h-full w-full">
      <header className="flex items-center h-[56px] bg-color-primary border-t border-white/50 pl-[24px]">
        <h1 className=" text-color-white text-4xl">{title}</h1>
      </header>
      <main className="text-xl">
        <div className="flex flex-col gap-[8px] pl-[24px] py-[24px]">
          <FieldValue field="nº:" value={processNumber} />
          <FieldValue field="cliente:" value={`${client?.firstName} ${client?.lastName}`} />
          <FieldValue field="advogados:" value={formatStringList(lawyersNames)} />
          <FieldValue field="status:" value={status} />
          <FieldValue field="Tribunal:" value={court} />
          <FieldValue field="Vara:" value={courtDivision} />
        </div>
        <div className="flex flex-col gap-[8px] px-[24px] py-[24px] border-t border-black/30">
          <h1 className="font-bold text-3xl">Resumo</h1>
          <p>{description}</p>
        </div>
        <div className="flex items-center h-[56px] bg-color-primary border-t pl-[24px]">
          <h1 className=" text-color-white text-3xl">Documentação</h1>
        </div>
      </main>
    </div>
  );
}
