interface Props {
  totalPage: number;
  page: number;
  setPage: any;
}

export function Pagination({ totalPage, page, setPage}: Props) {
  if (totalPage === 0) {
    return null;
  }

  return (
    <div className="flex justify-center border w-[80%] my-[40px]">
      <div className="flex gap-[16px]">
        {Array.from({ length: totalPage }).map((p, index) => {
          const currentPageIndex = index + 1;
          return (
            <div
              className={`flex justify-center items-center text-2xl bg-color-primary text-color-white size-[56px] rounded-lg ${
                page === index + 1 ? 'brightness-180' : 'cursor-pointer'
              }`}
              key={index}
              onClick={() => {
                if (page === currentPageIndex) return;
                setPage(currentPageIndex);
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
