import { Card } from '@/components/ui/Card/Card';
import { formatDate } from '@/lib/formatDate';
import { WithId } from '@/types/WithId';
import { Text } from '@/components/ui/Text';
import { CaseFile } from '@/types/CaseFile';
import { useFileCardActions } from '@/hooks/cards/useFilleCardActions';
import { formatFileSize } from '@/lib/formatFileSize';

interface Props {
  file: WithId<CaseFile>;
  onDelete: (fileId: string) => void;
}

export function FileCard({ onDelete, file }: Props) {
  const actions = useFileCardActions({
    onDelete: () => onDelete(file.id),
    onDownload: () => {
      window.open(file.url, '_blank');
    },
  });

  if (!actions) {
    return null;
  }

  const mapFileType: Record<string, { label: string; backgroundColor: string }> = {
    'application/pdf': {
      label: 'pdf',
      backgroundColor: 'bg-red-600',
    },
    png: {
      label: 'pdf',
      backgroundColor: 'bg-blue-600',
    },
  };

  const fileColor = mapFileType[file.mimeType].backgroundColor;
  const fileLabel = mapFileType[file.mimeType].label.toUpperCase();

  return (
    <Card className="border  overflow-hidden w-full" actions={actions}>
      <div className="flex juftify-center size-full">
        <div
          className={`flex items-center justify-center bg-red-600 text-white h-auto w-fit px-[8px] ${fileColor}`}
        >
          <Text as={'strong'}>{fileLabel}</Text>
        </div>
        <div className="flex flex-col size-full justify-center pl-[24px] pr-[64px] py-[8px]">
          <Text as={'strong'} variant="body">
            {file.name}
          </Text>
          <div className="flex flex-col md:flex-row w-full justify-between ">
            <Text variant="muted">
              {file.uploadedBy.firstName} {file.uploadedBy.lastName} • {formatDate(file.uploadedAt)}
            </Text>
            <Text variant="muted">{formatFileSize(Number(file.size))}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
}
