import { CaseFile } from '@/types/CaseFile';
import { WithId } from '@/types/WithId';
import { FileCard } from '../FileCard/FileCard';

interface Props {
  files: WithId<CaseFile>[];
  onDelete: (fileId: string, fileName: string) => void
}

export function FilesList({ files, onDelete }: Props) {
  const renderFiles = files.map((file) => {
    return <FileCard key={file.id} file={file} onDelete={onDelete} />;
  });

  return <div className='flex flex-col size-full gap-[16px]'>{renderFiles}</div>;
}
