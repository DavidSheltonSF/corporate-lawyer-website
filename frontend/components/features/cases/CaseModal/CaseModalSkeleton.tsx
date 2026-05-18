import { SkeletonLine } from '@/components/ui/SkeletonLine';

export function CaseModalSkeleton() {
  return (
    <div className="flex flex-col size-full bg-color-white">
      <header className="flex flex-col gap-[8px] w-full p-[24px] border-divider">
        <SkeletonLine className="w-110 h-[24px]" />
        <div className="flex flex-1">
          <SkeletonLine className="w-50 h-[8px]" />
        </div>
      </header>
      <div className="flex flex-col justify-between font-size-md">
        <div className="flex flex-col items-center min-md:flex-row min-md:items-start min-md:gap-[40px] border-b border-divider p-[24px]">
          <SkeletonLine className="w-30" />
          <SkeletonLine className="w-30" />
          <SkeletonLine className="w-30" />
        </div>
        <div className="flex flex-col justify-center gap-[8px] p-[24px] borer-b border-divider">
          <SkeletonLine className="w-50" />
          <SkeletonLine className="w-50" />
          <SkeletonLine className="w-50" />
          <SkeletonLine className="w-50" />
        </div>
        <div className="flex flex-col gap-[8px] border-b border-black/50 p-[16px]">
          <h1 className="text-2xl font-bold">Resumo</h1>
          <SkeletonLine className="w-190" />
          <SkeletonLine className="w-180" />
          <SkeletonLine className="" />
        </div>
      </div>
      <div className="flex flex-col gap-[24px] p-[24px]">
        <div className="flex justify-between  w-full">
          <h1>Arquivos</h1>
        </div>
        <div>{/* <CaseFilesTable documents={caseFiles} /> */}</div>
      </div>
    </div>
  );
}
