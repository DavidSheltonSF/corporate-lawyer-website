'use client';
import { useEffect, useState } from 'react';
import { BaseModal } from '../../../ui/Modal/BaseModal';
import { uploadCaseFile } from '@/services/cases/uploadCaseFile';
import { RequestState } from '@/types/RequestState';
import { RequestFeedback } from '../../../ui/Feedback/RequestFeedback';
import { handleLogout } from '@/lib/handleLogout';
import { UploadButton } from '../../../ui/UploadButton';
import { UploadedFileCard } from '@/components/ui/UploadedFileCard';

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
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setRequestState({ status: 'loading' });
    const response = await uploadCaseFile(formData, caseId);

    if (!response.success) {
      setRequestState({ ...response, status: 'error' });
    }

    setRequestState({ status: 'ok', data: null });
    refetchCase();
  }

  useEffect(() => {
    if (requestState?.status === 'error') {
      if (requestState.code === 'UNAUTHORIZED') {
        handleLogout();
      }
    }
  }, [requestState]);

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
      className="w-[90%] min-md:w-[60%] min-lg:w-[520px]"
      title="Envie um arquivo"
      onConfirm={handleUploadFile}
      onClose={() => {
        onClose();
      }}
    >
      <div className="flex gap-[24px] size-full flex flex-col text-center items-center p-[24px]">
        {renderFeedback()}
        {!file && <UploadButton setFile={setFile} />}
        {renderFileCard()}
        <p className="text-start text-size-sm">Apenas PDFs de tamanho máximo de 10 MB</p>
      </div>
    </BaseModal>
  );
}
