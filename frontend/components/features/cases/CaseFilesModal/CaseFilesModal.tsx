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
import { useFiles } from '@/hooks/fetching/files/useFiles';
import { useUpload } from '@/hooks/fetching/files/useUpload';
import { useSuccessModal } from '@/hooks/modals/useSuccessModal';
import { useErrorModal } from '@/hooks/modals/useErrorModal';

interface Props {
  caseId: string;
}

export function CaseFilesModal({ payload, close }: GlobalModalProps<Props>) {
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const uploadMutation = useUpload();
  const { openSuccessModal } = useSuccessModal();
  const { openErrorModal } = useErrorModal();

  const { caseId } = payload;

  const { data, fetchNextPage, isLoading, error } = useFiles({ ownerId: caseId, limit: 4 });

  async function handleUpload(ownerId: string, formData: FormData) {
    try {
      setIsUploading(true);
      const response = await uploadMutation.mutateAsync({ ownerId, formData });
      setIsUploading(false);
      openSuccessModal('Arquivo enviado com sucesso!');
    } catch (error: any) {
      openErrorModal(error.message);
    }
  }

  if (uploadModalIsOpen) {
    return (
      <CaseFilesUploadModal
        isUploading={isUploading}
        onUpload={handleUpload}
        caseId={caseId}
        close={() => setUploadModalIsOpen(false)}
      />
    );
  }

  const caseFiles = data?.pages.flatMap((page) => page.items);

  function renderContent() {
    if (isLoading) {
      return <LoadingModalScreeen />;
    }

    return (
      <div className="flex flex-col max-h-[40vh] pb-[24px]">
        <div className="flex items-center border-divider px-[24px] py-[8px]">
          <p className="font-bold">Arquivos enviados: {caseFiles?.length}</p>
          <OpenUploadModalButton
            className="ml-auto"
            handleClick={() => setUploadModalIsOpen(true)}
          />
        </div>
        <div className="flex overflow-y-scroll">
          {caseFiles && caseFiles.length > 0 ? (
            <FilesList files={caseFiles} />
          ) : (
            <ModalFeedback title="Nenhum arquivo encontrado" />
          )}
        </div>
      </div>
    );
  }

  const BaseModalProps = {
    className: 'w-[90%] min-md:w-[60%] min-lg:w-[780px]',
    title: 'Arquivos',
    onClose: close,
  };

  return <BaseModal {...BaseModalProps}>{renderContent()}</BaseModal>;
}
