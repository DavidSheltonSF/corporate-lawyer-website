import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { useState } from 'react';
import { CaseFilesUploadModal } from '../CaseFilesUploadModal/CaseFilesUploadModal';
import { CaseFilesTable } from '../CaseFilesTable';
import { OpenUploadModalButton } from '@/components/OpenUploadModalButton';

interface Props {
  caseId: string;
  caseFiles: any;
  refetchCaseFiles: () => void;
  close: () => void;
}

export function CaseFilesModal({ caseId, caseFiles, refetchCaseFiles, close }: Props) {
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);

  if (uploadModalIsOpen) {
    return (
      <CaseFilesUploadModal
        refetchCase={refetchCaseFiles}
        caseId={caseId}
        close={() => setUploadModalIsOpen(false)}
      />
    );
  }

  return (
    <BaseModal className="min-h-[50vh]" title="Arquivos" onClose={close}>
      <div className="flex flex-col p-[24px] h-fit">
        <div className="flex justify-end">
          <OpenUploadModalButton handleClick={() => setUploadModalIsOpen(true)} />
        </div>
        <CaseFilesTable documents={caseFiles} />
      </div>
    </BaseModal>
  );
}
