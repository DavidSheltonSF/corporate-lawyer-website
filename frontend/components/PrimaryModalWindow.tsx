'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function PrimaryModalWindow({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const windowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        closeModal();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function closeModal() {
    const modalWindow = document.querySelector('.modalWindow');
    modalWindow?.classList.add('fade-out-animation-fast');
    setTimeout(() => router.back(), 200);
  }

  return (
    <div className="fixed top-0 h-full w-full bg-black/20 fade-in-animation-fast">
      <div
        ref={windowRef}
        className="modalWindow flex flex-col  min-lg:pt-[80px] fixed z-99999 left-1/2 translate-x-[-50%] top-[8px]  min-lg:top-[80px] bg-color-primary w-[95%] min-lg:w-[960px] h-[85vh] rounded-xl overflow-hideden"
      >
        <div className="flex justify-end items-center h-[56px] pr-[8px]">
          <button
            className="size-[40px] cursor-pointer hover:bg-white/20 transition-[background-color] duration-300 rounded-lg"
            onClick={closeModal}
          >
            <img className="size-full" src="/icons/close.svg" alt="" />
          </button>
        </div>
        <div className="bg-color-white size-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
