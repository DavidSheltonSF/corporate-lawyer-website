export function CardSkeleton() {
  return (
    <article className="relative flex flex-col bg-color-white rounded-[8px] w-full h-fit min-md:w-[720px]">
      <div className="flex flex-col text-color-black p-[24px] gap-[32px]">
        <header className="flex flex-col gap-[8px]">
          <span className="animate-pulse bg-black/20 rounded-md w-[55%] h-[24px] font-bold text-3xl " />
          <span className="animate-pulse bg-black/20 rounded-md w-[35%] h-[8px] font-bold text-3xl " />
        </header>
        <div className="flex flex-col gap-[32px]">
          <span className="animate-pulse bg-black/20 rounded-md w-[30%] h-[16px] font-bold text-3xl " />
          <span className="animate-pulse bg-black/20 rounded-md w-[25%] h-[16px] font-bold text-3xl " />
        </div>
      </div>
    </article>
  );
}


