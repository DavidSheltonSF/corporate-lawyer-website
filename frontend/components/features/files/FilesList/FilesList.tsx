import { CaseFile } from '@/types/CaseFile';
import { WithId } from '@/types/WithId';
import { FileCard } from '../FileCard/FileCard';

interface Props {
  files: WithId<CaseFile>[];
}

export function FilesList({ files }: Props) {
  const renderFiles = files.map((file) => {
    return <FileCard key={file.id} file={file} onDelete={() => {}} />;
  });

  return <div className='flex flex-col size-full p-[24px] gap-[16px]'>{renderFiles}</div>;
}
