import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { useEffect, useState } from 'react';
import { CaseFilesUploadModal } from '../CaseFilesUploadModal/CaseFilesUploadModal';
import { OpenUploadModalButton } from '@/components/OpenUploadModalButton';
import { ModalFeedback } from '@/components/ui/Feedback/ModalFeedback';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { WithId } from '@/types/WithId';
import { CaseFile } from '@/types/CaseFile';
import { RequestState } from '@/types/RequestState';
import { handleLogout } from '@/lib/handleLogout';
import { getCaseFiles } from '@/services/cases/getCaseFiles';
import { LoadingModalScreeen } from '@/components/ui/Modal/LoadingModalScreen';
import { FilesList } from '../../files/FilesList/FilesList';

interface Props {
  caseId: string;
}

export function CaseFilesModal({ payload, close }: GlobalModalProps<Props>) {
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [requestState, setRequestState] = useState<RequestState<WithId<CaseFile>[]>>({
    status: 'idle',
  });
  const { caseId } = payload;
  const isLoading = requestState?.status === 'loading';

  async function fetchCaseFiles() {
    setRequestState({ status: 'loading' });
    const response = await getCaseFiles(caseId);

    if (!response.success) {
      const { code, message, details } = response;
      return setRequestState({ status: 'error', code, message, details });
    }

    setRequestState({ status: 'ok', data: response.data });
  }

  useEffect(() => {
    fetchCaseFiles();
  }, []);

  useEffect(() => {
    if (requestState.status === 'error') {
      if (requestState.code === 'UNAUTHORIZED') {
        handleLogout();
      }
    }
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

  function renderContent() {
    switch (requestState.status) {
      case 'loading':
        return <LoadingModalScreeen />;

      case 'ok':
        const caseFiles = requestState.data;
        return (
          <div className="flex flex-col max-h-[40vh] pb-[24px]">
            <div className="flex items-center border-divider px-[24px] py-[8px]">
              <p className="font-bold">Arquivos enviados: {caseFiles.length}</p>
              <OpenUploadModalButton
                className="ml-auto"
                handleClick={() => setUploadModalIsOpen(true)}
              />
            </div>
            <div className="flex overflow-y-scroll">
              {caseFiles.length > 0 ? (
                <FilesList files={caseFiles}/>
              ) : (
                <ModalFeedback title="Nenhum arquivo encontrado" />
              )}
            </div>
          </div>
        );

      default:
        break;
    }
  }

  const BaseModalProps = {
    className: 'w-[90%] min-md:w-[60%] min-lg:w-[780px]',
    title: 'Arquivos',
    onClose: close,
  };

  return <BaseModal {...BaseModalProps}>{renderContent()}</BaseModal>;
}
