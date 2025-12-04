import { Dispatch, SetStateAction } from 'react';

interface Props {
  totalPage: number;
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
}

export function Pagination({ totalPage, pageIndex, setPageIndex }: Props) {
  return (
    <div className="flex justify-center border absolute bottom-[24px] left-[50%] translate-x-[-50%] w-[80%]">
      <div className="flex gap-[16px]">
        {Array.from({ length: totalPage }).map((page, index) => {
          return (
            <div
              className={`flex justify-center items-center text-2xl bg-color-primary text-color-white size-[56px] rounded-lg ${
                pageIndex === index + 1 ? 'brightness-180' : ''
              }`}
              key={index}
              onClick={() => {
                setPageIndex(index + 1);
              }}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
