'use client';
import { FilesTable } from './FilesTable';
import { CaseFilesUploadModal } from './modals/CaseFilesUploaModal';
import { useEffect, useState } from 'react';
import { CaseFile } from '@/types/CaseFile';
import { fetchMyCaseFilesByCaseId } from '@/services/fetchMyCaseFilesByCaseId';

export function CaseFilesSection({ id, files }: { id: string; files: CaseFile[] }) {
  const [currentFiles, setCurrentFiles] = useState(files);
  const [updateFiles, setUpdateFiles] = useState(false);

  useEffect(() => {
    async function fetchCases() {
      const caseFiles = await fetchMyCaseFilesByCaseId(id);
      setCurrentFiles(caseFiles);
    }

    if (updateFiles) {
      fetchCases();
    }

    setUpdateFiles(false);
  }, [updateFiles]);

  return (
    <div className="w-full h-full pl-[24px] pb-[16px] overflow-y-scroll">
      <CaseFilesUploadModal caseId={id} setUpdateFiles={setUpdateFiles} />
      <FilesTable documents={currentFiles} />
    </div>
  );
}
