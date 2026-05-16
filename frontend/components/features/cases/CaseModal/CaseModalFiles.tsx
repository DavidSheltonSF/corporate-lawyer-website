import { WithId } from '@/types/WithId';
import { CaseFile } from '@/types/CaseFile';
import { CaseFilesTable } from '../CaseFilesTable';
import { CaseFilesUploadModal } from '@/components/modals/CaseFilesUploadModal';
import { useState } from 'react';
import { OpenUploadModalButton } from '@/components/OpenUploadModalButton';

interface Props {
  caseId: string;
  caseFiles: WithId<CaseFile>[];
}

export function CaseModalFiles({ caseId, caseFiles }: Props) {
  const [isOpen, setIOpen] = useState(false);

  function renderUploadModal() {
    if (isOpen) {
      return <CaseFilesUploadModal caseId={caseId} close={() => setIOpen(false)} />;
    }
  }

  return (
    <div className="flex flex-col gap-[24px] p-[24px]">
      {renderUploadModal()}
      <div className="flex justify-between  w-full">
        <h1>Arquivos</h1>
        <OpenUploadModalButton handleClick={() => setIOpen(true)} />
      </div>
      <div>
        <CaseFilesTable documents={caseFiles} />
      </div>
    </div>
  );
}
