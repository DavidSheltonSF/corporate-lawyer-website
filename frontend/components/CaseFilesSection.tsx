'use client';
import { CaseFilesTable } from './CaseFilesTable';
import { useEffect, useState } from 'react';
import { CaseFile } from '@/types/CaseFile';
import { getMyCaseFilesByCaseId } from '@/services/cases/getMyCaseFilesByCaseId';

export function CaseFilesSection({ id, files }: { id: string; files: CaseFile[] }) {
  const [currentFiles, setCurrentFiles] = useState(files);

  useEffect(() => {
    async function fetchCases() {
      const caseFiles = await getMyCaseFilesByCaseId(id);
      setCurrentFiles(caseFiles);
    }
    fetchCases();
  }, []);

  return (
    <div className="w-full h-full pl-[24px] pb-[16px] overflow-y-scroll">
      <CaseFilesTable documents={currentFiles} />
    </div>
  );
}
