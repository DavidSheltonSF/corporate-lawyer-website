import { CaseDocumentPopulated } from '@/types/CaseDocumentPopulated';
import Link from 'next/link';

interface Props {
  documents: CaseDocumentPopulated[];
}

export function DocumentTable({ documents }: Props) {
  return (
    <div className="table w-[88%] h-fit">
      <div className="header">
        <div>Name</div>
        <div>Upload</div>
        <div></div>
      </div>

      {documents.map((document, index) => {
        return (
          <div key={index} className="row">
            <div className="overflow-wrap">{document.name}</div>
            <div>{`${document.uploadedAt.toUTCString()} - ${document.uploadedBy.firstName} ${
              document.uploadedBy.lastName
            }`}</div>
            <div className="flex justify-center items-center">
              <Link href={document.url} target='_blank'>
                <button className="bg-color-primary text-color-white px-[16px] py-[4px] rounded-sm hover:brightness-130 cursor-pointer">
                  Download
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
