import { CaseDocumentPopulated } from '@/types/CaseDocumentPopulated';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';

interface Props {
  documents: CaseDocumentPopulated[];
}

export function DocumentTable({ documents }: Props) {
  return (
    <div className="table w-[88%] h-fit">
      <div className="header">
        <div>Name</div>
        <div className="hidden min-md:blok">Upload</div>
        <div></div>
      </div>

      {documents.map((document, index) => {
        return (
          <div key={index} className="row">
            <div className="overflow-wrap">{document.name}</div>
            <div className="hidden min-md:block">{`${document.uploadedAt.toUTCString()} - ${
              document.uploadedBy.firstName
            } ${document.uploadedBy.lastName}`}</div>
            <div className="flex justify-center items-center">
              <Link href={document.url} target="_blank">
                <div className="hidden min-lg:block">
                  <Button backgroundColor="var(--primary-color)" textColor="var(--white-color)">
                    Download
                  </Button>
                </div>
                <div className="min-lg:hidden">
                  <Button backgroundColor="var(--primary-color)">
                    <Image src="/icons/download.svg" width={32} height={32} alt=""></Image>
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
