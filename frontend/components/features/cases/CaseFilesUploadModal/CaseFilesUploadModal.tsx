'use client';
import { useState } from 'react';
import { BaseModal } from '../../../ui/Modal/BaseModal';
import { uploadCaseFile } from '@/services/cases/uploadCaseFile';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../../../ui/Feedback/RequestFeedback';
import { handleLogout } from '@/lib/handleLogout';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { Button } from '../../../ui/Button/Button';
import { UploadButton } from '../../../ui/UploadButton';
import { DocumentIcon } from '../../../icons/DocumentIcon';
import { CloseIcon } from '../../../icons/CloseIcon';
import { formatFileSize } from '@/lib/formatFileSize';
import { UploadedFileCard } from '@/components/ui/UploadedFileCard';
import { ButtonVariant } from '@/components/ui/Button/ButtonVariant';

interface Props {
  caseId: string;
  close: Function;
  refetchCase: () => void;
}

export function CaseFilesUploadModal({ caseId, close, refetchCase }: Props) {
  const [requestState, setRequestState] = useState<null | RequestState>(null);
  const [file, setFile] = useState<File | null>(null);

  function onClose() {
    if (requestState?.status === 'loading') return;
    close();
    setRequestState(null);
  }

  async function handleUploadFile() {
    try {
      if (!file) return;

      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        throw Error('Arquivo ultrapassa o tamanho máximo de 10 MB.');
      }
      const formData = new FormData();
      formData.append('file', file);
      setRequestState({ status: 'loading' });
      await uploadCaseFile(formData, caseId);
      setRequestState({ status: 'ok', message: `Arquivo '${file?.name}' foi enviado com sucesso` });
      refetchCase();
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });

      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  function renderFileCard() {
    if (!file) return;
    return (
      <UploadedFileCard
        file={file}
        onClose={() => {
          setFile(null);
          setRequestState(null);
        }}
      />
    );
  }

  function renderFeedback() {
    const isLoading = requestState?.status === 'loading';
    if (!requestState || isLoading) return;

    return <RequestFeedback requestState={requestState} />;
  }

  return (
    <BaseModal
      title="Envie um arquivo"
      className="top-[25%] left-1/2 translate-x-[-50%] w-[440px] h-fit"
      onClose={() => {
        onClose();
      }}
    >
      <div className="flex gap-[24px] size-full flex flex-col text-center items-center p-[24px]">
        {renderFeedback()}
        {!file && <UploadButton setFile={setFile} />}
        {renderFileCard()}
        <p className="text-start text-size-sm">Apenas PDFs de tamanho máximo de 10 MB</p>
        <div className="flex gap-[24px] ml-auto">
          <Button
            onClick={() => onClose()}
            variant={ButtonVariant.SECONDARY}
            className="px-[16px] py-[4px]"
          >
            Voltar
          </Button>
          <Button
            onClick={handleUploadFile}
            variant={ButtonVariant.PRIMARY}
            className="px-[16px] py-[4px]"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
