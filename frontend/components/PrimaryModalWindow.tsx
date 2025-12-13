'use client'
import { useRouter } from "next/navigation";

export function PrimaryModalWindow({children}: {children: React.ReactNode}) {

  const router = useRouter()

  function closeModal(){
    router.back()
  }

  return (
    <div className="flex pt-[80px] absolute z-99999 left-1/2 translate-x-[-50%] top-[160px] bg-color-primary w-[960px] h-[80vh] rounded-xl overflow-hidden">
      <div className="bg-color-white">{children}</div>

      <button
        className="absolute right-[16px] top-[40px] translate-y-[-50%] size-[40px] cursor-pointer hover:bg-white/20 transition-[background-color] duration-300 rounded-lg"
        onClick={closeModal}
      >
        <img className="size-full" src="/icons/close.svg" alt="" />
      </button>
    </div>
  );
}