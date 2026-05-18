import { formatData } from '@/lib/formatData';
import { CaseFile } from '@/types/CaseFile';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';
import { CaseFilesTableButton } from '@/components/features/cases/CaseFilesTableButton';

interface Props {
  documents: CaseFile[];
}

CaseFilesTable.Button = CaseFilesTableButton;

export function CaseFilesTable({ documents }: Props) {
  const userContext = useAuthenticatedUserContext();

  const userId = userContext.userData.id;
  return (
    <div className="table w-[88%] h-fit">
      <div className="header">
        <div>Name</div>
        <div className="hidden min-md:block">Upload</div>
        <div></div>
      </div>

      {documents.map((document, index) => {
        const uploadedByMe = document.uploadedBy.id === userId;

        return (
          <div key={index} className="row">
            <div className="overflow-wrap">{document.name}</div>
            <div className="hidden min-md:block">{`${formatData(document.uploadedAt)} - ${
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
