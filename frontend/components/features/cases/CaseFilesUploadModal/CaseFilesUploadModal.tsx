'use client';
import { useState } from 'react';
import { PrimaryModal } from '../../../ui/Modal/PrimaryModal';
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

interface Props {
  caseId: string;
  close: Function;
  refetchCase: () => void;
}

export function CaseFilesUploadModal({ caseId, close, refetchCase }: Props) {
  const [requestState, setRequestState] = useState<null | RequestState>(null);
  const [file, setFile] = useState<File | null>(null);

  function closeModal() {
    if (requestState?.status === 'loading') return;
    close();
    setRequestState(null);
  }

  async function handleUploadFile() {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      setRequestState({ status: 'loading' });
      await uploadCaseFile(formData, caseId);
      setRequestState({ status: 'ok', message: `Arquivo '${file?.name}' foi enviado com sucesso` });
      refetchCase();
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error' });

      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  function renderFileCard() {
    if (!file) return;
    return (
      <article className="relative flex items-start border w-full h-fit p-[16px] gap-[16px] rounded-sm">
        <Button onClick={() => setFile(null)} className="absolute top-[8px] right-[8px] p-[4px]">
          <CloseIcon className="size-[16px] " />
        </Button>
        <div className="border size-[64px] rounded-sm">
          <DocumentIcon className="fill-[var(--color-primary-light)]" />
        </div>
        <div className="flex flex-col items-start">
          <p>{file.name}</p>
          <p>{formatFileSize(file.size)}</p>
        </div>
      </article>
    );
  }

  return (
    <PrimaryModal
      title="Envie um arquivo"
      additionalStyles="z-2 fixed top-[25%] left-1/2 translate-x-[-50%] w-[440px] h-fit rounded-lg overflow-hidden shadow-[0px_0px__3px_black]"
      closeModal={() => {
        closeModal();
      }}
    >
      <div className="flex gap-[24px] size-full flex flex-col text-center items-center p-[24px]">
        {(requestState?.status === 'ok' || requestState?.status === 'error') && (
          <RequestFeedback requestState={requestState} />
        )}
        <UploadButton setFile={setFile} />
        {renderFileCard()}
        <p className="text-start text-size-sm">Apenas PDFs de tamanho máximo de 10MB</p>
        <div className="flex gap-[24px] ml-auto">
          <Button onClick={() => closeModal()} variant="secondary" className="px-[16px] py-[4px]">
            Voltar
          </Button>
          <Button onClick={handleUploadFile} variant="primary" className="px-[16px] py-[4px]">
            Confirmar
          </Button>
        </div>
      </div>
    </PrimaryModal>
  );
}
