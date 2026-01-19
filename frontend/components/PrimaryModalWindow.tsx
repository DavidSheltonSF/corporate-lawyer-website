'use client';
import { useEffect, useRef } from 'react';

interface Props {
  closeModal: Function;
  children: React.ReactNode;
}

export function PrimaryModalWindow(props: Props) {
  const windowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    function handleClickOutside(e: MouseEvent) {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        closeModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const { closeModal, children } = props;

  return (
    <div className="h-full w-full bg-black/20 fade-in-animation-fast">
      <div
        ref={windowRef}
        className="modalWindow flex flex-col relative  bg-color-primary size-full"
      >
        <div className="flex justify-end items-center h-[56px] pr-[8px]">
          <button
            className="size-[40px] cursor-pointer hover:bg-white/20 transition-[background-color] duration-300 rounded-lg"
            onClick={() => closeModal()}
          >
            <img className="size-full" src="/icons/close.svg" alt="" />
          </button>
        </div>
        <div className="bg-color-white size-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
