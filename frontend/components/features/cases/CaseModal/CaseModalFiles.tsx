import { WithId } from '@/types/WithId';
import { CaseFile } from '@/types/CaseFile';
import { CaseFilesTable } from '../CaseFilesTable';
import { OpenUploadModalButton } from '@/components/OpenUploadModalButton';

interface Props {
  caseFiles: WithId<CaseFile>[];
  openUploadModal: () => void;
}

export function CaseModalFiles({ caseFiles, openUploadModal }: Props) {
  return (
    <div className="flex flex-col gap-[24px] p-[24px]">
      <div className="flex justify-between  w-full">
        <h1>Arquivos</h1>
        <OpenUploadModalButton handleClick={openUploadModal} />
      </div>
      <div>
        <CaseFilesTable documents={caseFiles} />
      </div>
    </div>
  );
}
