'use client';
import { OpenUploadModalButton } from '../OpenUploadModalButton';

export function CaseModalSkeleton() {
  return (
    <div className="flex flex-col h-full w-full bg-color-primary">
      <div className="w-full h-[64px]"></div>
      <div className="size-full bg-color-white">
        <header className="flex items-center bg-color-primary border-t border-white/50 pl-[24px] py-[16px]">
          <span className="w-160 h-[24px] bg-gray-200 animate-pulse"></span>
        </header>
        <main className="h-full text-xl">
          <div className="flex flex-col gap-[8px] pl-[24px] py-[24px]">
            <span className="w-80 h-[24px] bg-gray-300 animate-pulse"></span>
            <span className="w-90 h-[24px] bg-gray-300 animate-pulse"></span>
            <span className="w-70 h-[24px] bg-gray-300 animate-pulse"></span>
            <span className="w-100 h-[24px] bg-gray-300 animate-pulse"></span>
            <span className="w-80 h-[24px] bg-gray-300 animate-pulse"></span>
          </div>
          <div className="flex flex-col gap-[8px] px-[24px] py-[24px] border-t border-black/30">
            <h1 className="font-bold text-3xl">Resumo</h1>
            <span className="w-180 h-[24px] bg-gray-300 animate-pulse"></span>
            <span className="w-150 h-[24px] bg-gray-300 animate-pulse"></span>
          </div>
          <div className="flex relative items-center h-[56px] bg-color-primary border-t pl-[24px]">
            <h1 className=" text-color-white text-3xl">Documentação</h1>
            <div className="absolute top-1/2 translate-y-[-50%] right-[16px]">
              <OpenUploadModalButton disabled />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
