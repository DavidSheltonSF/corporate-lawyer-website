interface Props {
  reloadByPageIndex: any;
  totalPage: number;
  pageIndex: number;
}

export function Pagination({ reloadByPageIndex, totalPage, pageIndex }: Props) {
  return (
    <div className="flex justify-center border w-[80%] my-[40px]">
      <div className="flex gap-[16px]">
        {Array.from({ length: totalPage }).map((page, index) => {
          const currentPageIndex = index + 1;
          return (
            <div
              className={`flex justify-center items-center text-2xl bg-color-primary text-color-white size-[56px] rounded-lg ${
                pageIndex === index + 1 ? 'brightness-180' : 'cursor-pointer'
              }`}
              key={index}
              onClick={() => {
                if (pageIndex == currentPageIndex) return;
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
