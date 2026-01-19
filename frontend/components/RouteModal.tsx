'use client';
import { useRouter } from 'next/navigation';
import { PrimaryModalWindow } from './PrimaryModalWindow';

export function RouteModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="fixed z-99999 left-1/2 translate-x-[-50%] top-[8px] min-lg:top-[80px] w-[95%] min-lg:w-[960px] h-[85vh] rounded-xl overflow-hidden">
      <PrimaryModalWindow
        closeModal={() => {
          const modalWindow = document.querySelector('.modalWindow');
          modalWindow?.classList.add('fade-out-animation-fast');
          setTimeout(() => router.back(), 200);
        }}
      >
        {children}
      </PrimaryModalWindow>
    </div>
  );
}
