import { formatDate } from '@/lib/formatDate';
import { CaseFile } from '@/types/CaseFile';
import { CaseFilesTableButton } from '@/components/features/cases/CaseFilesTableButton';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';

interface Props {
  documents: CaseFile[];
}

CaseFilesTable.Button = CaseFilesTableButton;

export function CaseFilesTable({ documents }: Props) {
  const user = useCurrentUser();
  return (
    <div className="table w-full h-fit">
      <div className="header">
        <div>Name</div>
        <div className="hidden min-md:block">Upload</div>
      </div>

      {documents.map((document, index) => {
        const uploadedByMe = document.uploadedBy.id === user?.id;

        return (
          <div key={index} className="row">
            <div className="overflow-wrap">{document.name}</div>
            <div className="hidden min-md:block">{`${formatDate(document.uploadedAt)} - ${
              uploadedByMe
                ? 'Me'
                : document.uploadedBy.firstName + ' ' + document.uploadedBy.lastName
            }`}</div>

            <CaseFilesTable.Button
              fileUrl={document.url}
              className="ml-auto bg-color-white hover:brightness-95 text-color-black min-md:border border-black px-[8px] py-[8px]"
            />
          </div>
        );
      })}
    </div>
  );
}
