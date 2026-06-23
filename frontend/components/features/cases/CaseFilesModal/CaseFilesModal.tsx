import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { useState } from 'react';
import { CaseFilesUploadModal } from '../CaseFilesUploadModal/CaseFilesUploadModal';
import { OpenUploadModalButton } from '@/components/OpenUploadModalButton';
import { ModalFeedback } from '@/components/ui/Feedback/ModalFeedback';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { LoadingModalScreeen } from '@/components/ui/Modal/LoadingModalScreen';
import { FilesList } from '../../files/FilesList/FilesList';
import { useFiles } from '@/hooks/fetching/files/useFiles';
import { useUpload } from '@/hooks/fetching/files/useUpload';
import { useSuccessModal } from '@/hooks/modals/useSuccessModal';
import { useErrorModal } from '@/hooks/modals/useErrorModal';
import { useDeleteFile } from '@/hooks/fetching/files/useDeleteFile';
import { useConfirmModal } from '@/hooks/modals/useConfirmModal';
import { ButtonWithLoadingEffect } from '@/components/ui/ButtonWithLoadingEffect';

interface Props {
  caseId: string;
}

export function CaseFilesModal({ payload, close }: GlobalModalProps<Props>) {
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const uploadMutation = useUpload();
  const deleteMutation = useDeleteFile();
  const { openSuccessModal } = useSuccessModal();
  const { openErrorModal } = useErrorModal();
  const { openConfirmModal } = useConfirmModal();

  const { caseId } = payload;

  const { data, fetchNextPage, hasNextPage, isLoading, error } = useFiles({
    ownerId: caseId,
    limit: 4,
  });

  async function handleUpload(ownerId: string, formData: FormData) {
    try {
      setIsUploading(true);
      await uploadMutation.mutateAsync({ ownerId, formData });
      setIsUploading(false);
      openSuccessModal('Arquivo enviado com sucesso!');
    } catch (error: any) {
      openErrorModal(error.message);
    }
  }

  async function handleDelete(fileId: string) {
    try {
      setIsUploading(true);
      await deleteMutation.mutateAsync(fileId);
      setIsUploading(false);
      openSuccessModal('Arquivo excluido com sucesso!');
    } catch (error: any) {
      openErrorModal(error.message);
    }
  }

  function handleOpenConfirmModal(fileId: string, fileName: string) {
    openConfirmModal({
      message: `Tem certeza que quer excluir '${fileName}'? Essa ação não poderá ser revertida.`,
      title: 'Excluir arquivo',
      onConfirm: () => handleDelete(fileId),
    });
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
  const caseFiles = data?.items;

  function renderContent() {
    if (isLoading) {
      return <LoadingModalScreeen />;
    }

    return (
      <div className="flex flex-col max-h-[55vh] pb-[24px]">
        <div className="flex flex-col md:flex-row md:items-center border-divider px-[24px] py-[8px]">
          <p className="font-bold">Arquivos enviados: {data?.totalItems}</p>
          <OpenUploadModalButton
            className="md:ml-auto"
            handleClick={() => setUploadModalIsOpen(true)}
          />
        </div>
        <div className="flex flex-col gap-[24px] overflow-y-scroll p-[24px]">
          {caseFiles && caseFiles.length > 0 ? (
            <FilesList onDelete={handleOpenConfirmModal} files={caseFiles} />
          ) : (
            <ModalFeedback title="Nenhum arquivo encontrado" />
          )}

          {hasNextPage && (
            <ButtonWithLoadingEffect
              label="Mostrar mais"
              loadingLabel="Carregando"
              isLoading={isLoading}
              onClick={() => fetchNextPage()}
            />
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
