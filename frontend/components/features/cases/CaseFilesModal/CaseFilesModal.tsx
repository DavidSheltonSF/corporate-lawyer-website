import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { useState } from 'react';
import { CaseFilesUploadModal } from '../CaseFilesUploadModal/CaseFilesUploadModal';
import { CaseFilesTable } from '../CaseFilesTable';
import { OpenUploadModalButton } from '@/components/OpenUploadModalButton';
import { ModalFeedback } from '@/components/ui/Feedback/ModalFeedback';

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
    <BaseModal title="Arquivos" onClose={close}>
      <div className="flex flex-col h-fit pb-[24px]">
        <div className="flex justify-end border-divider px-[24px] py-[8px]">
          <OpenUploadModalButton handleClick={() => setUploadModalIsOpen(true)} />
        </div>
        <div className="flex px-[24px]">
          {caseFiles.length > 0 ? (
            <CaseFilesTable documents={caseFiles} />
          ) : (
            <ModalFeedback title="Nenhum arquivo encontrado" />
          )}
        </div>
      </div>
    </BaseModal>
  );
}
