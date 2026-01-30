'use client';
import { FilesTable } from './FilesTable';
import { CaseFilesUploadModal } from './modals/CaseFilesUploaModal';
import { useEffect, useState } from 'react';
import { fetchCaseById } from '@/services/fetchCaseById';
import { CaseFile } from '@/types/CaseFile';

export function CaseModalFiles({ id, files }: { id: string; files: CaseFile[] }) {
  const [currentFiles, setCurrentFiles] = useState(files);
  const [updateFiles, setUpdateFiles] = useState(false);

  useEffect(() => {
    async function fetchCases() {
      const caseData = await fetchCaseById(id);
      setCurrentFiles(caseData.files);
    }

    if (updateFiles) {
      fetchCases();
    }

    setUpdateFiles(false);
  }, [updateFiles]);

  return (
    <div className="w-full h-[240px] pl-[24px] pb-[16px] overflow-y-scroll">
      <CaseFilesUploadModal caseId={id} setUpdateFiles={setUpdateFiles} />
      <FilesTable documents={currentFiles} />
    </div>
  );
}
