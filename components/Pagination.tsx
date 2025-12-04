interface Props {
  reloadByPageIndex: any;
  totalPage: number;
  pageIndex: number;
}

export function Pagination({ reloadByPageIndex, totalPage, pageIndex }: Props) {
  return (
    <div className="flex justify-center border absolute bottom-[24px] left-[50%] translate-x-[-50%] w-[80%]">
      <div className="flex gap-[16px]">
        {Array.from({ length: totalPage }).map((page, index) => {
          const currentPageIndex = index + 1;
          return (
            <div
              className={`flex justify-center items-center text-2xl bg-color-primary text-color-white size-[56px] rounded-lg ${
                pageIndex === index + 1 ? 'brightness-180' : ''
              }`}
              key={index}
              onClick={() => {
                reloadByPageIndex(currentPageIndex);
              }}
            >
              {currentPageIndex}
            </div>
          );
        })}
      </div>
    </div>
  );
}
