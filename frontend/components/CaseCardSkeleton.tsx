export function CaseCardSkeleton() {
  return (
    <article className="flex flex-col animate-pulse bg-color-primary w-full min-md:w-[80%] min-lg:w-[640px] h-max rounded-xl overflow-hidden">
      <header className="flex items-center pl-[24px] h-[56px]">
        <span className="bg-white/50 rounded-xl w-[75%] h-[24px] font-bold text-3xl "></span>
      </header>
      <main className="flex flex-col gap-[16px] flex-1 px-[24px] py-[16px] bg-color-white text-color-black text-lg">
        <span className="animate-pulse bg-black/50 rounded-xl w-[75%] h-[16px] font-bold text-3xl "></span>
        <span className="animate-pulse bg-black/50 rounded-xl w-[70%] h-[16px] font-bold text-3xl "></span>
        <span className="animate-pulse bg-black/50 rounded-xl w-[50%] h-[16px] font-bold text-3xl "></span>
        <span className="animate-pulse bg-black/50 rounded-xl w-[70%] h-[16px] font-bold text-3xl "></span>
      </main>
    </article>
  );
}
