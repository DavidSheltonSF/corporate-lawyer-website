import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { useEffect, useState } from 'react';
import { CaseFilesUploadModal } from '../CaseFilesUploadModal/CaseFilesUploadModal';
import { CaseFilesTable } from '../CaseFilesTable';
import { OpenUploadModalButton } from '@/components/OpenUploadModalButton';
import { ModalFeedback } from '@/components/ui/Feedback/ModalFeedback';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { WithId } from '@/types/WithId';
import { CaseFile } from '@/types/CaseFile';
import { RequestState } from '@/types/RequestState';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { getCaseFiles } from '@/services/cases/getCaseFiles';
import { LoadingModalScreeen } from '@/components/ui/Modal/LoadingModalScreen';

interface Props {
  caseId: string;
}

export function CaseFilesModal({ payload, close }: GlobalModalProps<Props>) {
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [caseFiles, setCaseFiles] = useState<WithId<CaseFile>[]>([]);
  const { caseId } = payload;
  const isLoading = requestState?.status === 'loading';

  async function fetchCaseFiles() {
    try {
      setRequestState({ status: 'loading' });
      await new Promise((resolve) => setTimeout(resolve, 4000))
      
      const data = await getCaseFiles(caseId);
      setCaseFiles(data);
      setRequestState({ status: 'ok' });
    } catch (error: any) {
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }

      setRequestState({ status: 'error', message: error.message });
    }
  }

  useEffect(() => {
    fetchCaseFiles();
  }, []);

  if (uploadModalIsOpen) {
    return (
      <CaseFilesUploadModal
        refetchCase={fetchCaseFiles}
        caseId={caseId}
        close={() => setUploadModalIsOpen(false)}
      />
    );
  }

  const BaseModalProps = {
    className: 'w-[90%] min-md:w-[60%] min-lg:w-[480px]',
    title: 'Arquivos',
    onClose: close,
  };

  if (isLoading) {
    return (
      <BaseModal {...BaseModalProps}>
        <LoadingModalScreeen />
      </BaseModal>
    );
  }

  return (
    <BaseModal {...BaseModalProps}>
      <div className="flex flex-col max-h-[40vh] pb-[24px]">
        <div className="flex items-center border-divider px-[24px] py-[8px]">
          <p className="font-bold">Arquivos enviados: {caseFiles.length}</p>
          <OpenUploadModalButton
            className="ml-auto"
            handleClick={() => setUploadModalIsOpen(true)}
          />
        </div>
        <div className="flex px-[24px] overflow-y-scroll">
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
