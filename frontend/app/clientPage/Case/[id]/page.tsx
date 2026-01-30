import { CaseModalFiles } from '@/components/CaseModalFIles';
import { FieldValue } from '@/components/FieldValue';
import { OpenUploadModalButton } from '@/components/OpenUploadModalButton';
import { formatStringList } from '@/lib/formatStringList';
import { fetchCaseById } from '@/services/fetchCaseById';

export default async function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const caseData = await fetchCaseById(id, ['client', 'lawyers']);

  const { processNumber, title, status, lawyers, client, court, courtDivision, description } =
    caseData;

  const lawyersNames: string[] = [];
  lawyers?.forEach((lawyer) => {
    if (!lawyer.firstName || !lawyer.lastName) return;
    lawyersNames.push(`${lawyer.firstName} ${lawyer.lastName}`);
  });

  return (
    <div className="flex flex-col h-full w-full bg-color-primary">
      {/* This div below is necessary to push the content down from the absolute navbar when this page is open outside a modal */}
      <div className="w-full h-[64px]"></div>
      <div className="size-full bg-color-white">
        <header className="flex items-center bg-color-primary border-t border-white/50 pl-[24px] py-[16px]">
          <h1 className=" text-color-white text-4xl">{title}</h1>
        </header>
        <main className="h-full text-xl">
          <div className="flex flex-col gap-[8px] pl-[24px] py-[24px]">
            <FieldValue field="nº:" value={processNumber || ''} />
            <FieldValue
              field="cliente:"
              value={`${client?.firstName || ''} ${client?.lastName || ''}`}
            />
            <FieldValue field="advogados:" value={formatStringList(lawyersNames) || ''} />
            <FieldValue field="status:" value={status || ''} />
            <FieldValue field="Tribunal:" value={court || ''} />
            <FieldValue field="Vara:" value={courtDivision || ''} />
          </div>
          <div className="flex flex-col gap-[8px] px-[24px] py-[24px] border-t border-black/30">
            <h1 className="font-bold text-3xl">Resumo</h1>
            <p>{description || ''}</p>
          </div>
          <div className="flex relative items-center h-[56px] bg-color-primary border-t pl-[24px]">
            <h1 className=" text-color-white text-3xl">Documentação</h1>
            <div className="absolute top-1/2 translate-y-[-50%] right-[16px]">
              <OpenUploadModalButton />
            </div>
          </div>
          <CaseModalFiles id={id} files={caseData.files} />
        </main>
      </div>
    </div>
  );
}
