import { CaseDocumentPopulated } from '@/types/CaseDocumentPopulated';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  documents: CaseDocumentPopulated[];
}

export function DocumentTable({ documents }: Props) {
  return (
    <div className="table w-[88%] h-fit">
      <div className="header">
        <div>Name</div>
        <div className='hidden min-md:blok'>Upload</div>
        <div></div>
      </div>

      {documents.map((document, index) => {
        return (
          <div key={index} className="row">
            <div className="overflow-wrap">{document.name}</div>
            <div className='hidden min-md:block'>{`${document.uploadedAt.toUTCString()} - ${document.uploadedBy.firstName} ${
              document.uploadedBy.lastName
            }`}</div>
            <div className="flex justify-center items-center">
              <Link href={document.url} target='_blank'>
                <button className="hidden min-md:block bg-color-primary text-color-white px-[16px] py-[4px] rounded-sm hover:brightness-130 cursor-pointer">
                  Download
                </button>
                <button className='flex relative justify-center items-center min-md:hidden bg-color-primary rounded-sm hover:brightness-130 cursor-pointer size-[40px]'>
                  <Image src="/icons/download.svg" fill sizes='32px' alt=''></Image>
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
