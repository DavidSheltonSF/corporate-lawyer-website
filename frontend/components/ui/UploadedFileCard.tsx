import { formatFileSize } from '@/lib/formatFileSize';
import { CloseIcon } from '../icons/CloseIcon';
import { DocumentIcon } from '../icons/DocumentIcon';
import { Button } from './Button/Button';

interface Props {
  file: File;
  onClose: () => void;
}

export function UploadedFileCard({ file, onClose }: Props) {
  return (
    <article className="relative flex items-start border w-full h-fit p-[16px] gap-[16px] rounded-sm">
      <Button onClick={onClose} className="absolute top-[8px] right-[8px] p-[4px]">
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
