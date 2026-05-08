import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/Button/Button';
import { formatData } from '@/lib/formatData';
import { CaseFile } from '@/types/CaseFile';
import { MissingContextError } from '@/errors/MissingContextError';
import { useAuthenticatedUserContext } from '@/hooks/useAuthenticatedUserContext';

interface Props {
  documents: CaseFile[];
}

export function CaseFilesTable({ documents }: Props) {
  const userContext = useAuthenticatedUserContext();

  if (!userContext) {
    throw new MissingContextError('UserDataContext');
  }

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
            <div className="flex justify-center items-center">
              <Link href={document.url} target="_blank">
                <div className="hidden min-lg:block">
                  <Button backgroundColor="var(--primary-color)" textColor="var(--white-color)">
                    Download
                  </Button>
                </div>
                <div className="min-lg:hidden">
                  <Button backgroundColor="var(--primary-color)" width="56px" height="56px">
                    <span className="flex size-full justify-center items-center">
                      {' '}
                      <Image src="/icons/download.svg" width={32} height={32} alt=""></Image>
                    </span>
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
