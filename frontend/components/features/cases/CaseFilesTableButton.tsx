import { PropsWithClassName } from '@/types/PropsWithClassName';
import { Button } from '../../ui/Button/Button';
import { twMerge } from 'tailwind-merge';
import { DownloadIcon } from '../../icons/DownloadIcon';
import Link from 'next/link';

interface Props {
  fileUrl: string;
}

export function CaseFilesTableButton({ fileUrl, className }: PropsWithClassName<Props>) {
  const baseStyles = 'flex w-max items-center gap-[8px]';
  return (
    <Link href={fileUrl} target="_blank">
      <Button variant="secondary" className={twMerge(baseStyles, className)}>
        <DownloadIcon className="size-[24px]" />
        <span className="hidden min-md:block">Download</span>
      </Button>
    </Link>
  );
}
