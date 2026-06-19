'use client';
import {  useState } from 'react';
import { BaseModal } from '../../../ui/Modal/BaseModal';
import { UploadButton } from '../../../ui/UploadButton';
import { UploadedFileCard } from '@/components/ui/UploadedFileCard';
import { UploadFileState } from '@/types/UploadFileState';
import { FeedbackMessage } from '@/components/ui/Feedback/FeedbackMessage';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';

interface Props {
  caseId: string;
  close: Function;
  isUploading: boolean;
  onUpload: (caseId: string, formData: FormData) => void;
}

export function CaseFilesUploadModal({ caseId, close, onUpload, isUploading }: Props) {
  const [uploadFileState, setUploadFileState] = useState<UploadFileState>({ status: 'idle' });

  function onClose() {
    if (isUploading) return;
    close();
  }

  async function handleUploadFile() {
    if (uploadFileState?.status !== 'ok') return;
    const formData = new FormData();
    formData.append('file', uploadFileState.file);
    onUpload(caseId, formData);
  }

  function renderFileCard() {
    if (uploadFileState.status !== 'ok') return;
    return (
      <UploadedFileCard
        file={uploadFileState.file}
        onClose={() => {
          setUploadFileState({ status: 'idle' });
        }}
      />
    );
  }

  function renderUploadFeedback() {
    if (isUploading) {
      return <FeedbackMessage status="ok" message="Enviando..." />;
    };
    switch (uploadFileState?.status) {
      case 'ok':
        return <FeedbackMessage status="ok" message={uploadFileState.message} />;

      case 'error':
        return <FeedbackMessage status="error" message={uploadFileState.message} />;

      default:
        return null;
    }
  }

  return (
    <BaseModal
      className="w-[90%] min-md:w-[60%] min-lg:w-[520px]"
      title="Envie um arquivo"
      confirmButtonVariant={uploadFileState.status !== 'ok' ? ButtonVariant.DISABLED : undefined}
      onConfirm={handleUploadFile}
      onClose={() => {
        onClose();
      }}
    >
      <div className="flex gap-[24px] size-full flex flex-col text-center items-center p-[24px]">
        {renderUploadFeedback()}
        {uploadFileState.status !== 'ok' && (
          <UploadButton setUploadFileState={setUploadFileState} />
        )}
        {renderFileCard()}
        <p className="text-start text-size-sm">Apenas PDFs de tamanho máximo de 10 MB</p>
      </div>
    </BaseModal>
  );
}
