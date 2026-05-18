import { PropsWithClassName } from '@/types/PropsWithClassName';
import { twMerge } from 'tailwind-merge';

export function SkeletonLine({ className }: PropsWithClassName) {
  return (
    <span
      className={twMerge('block h-[16px] w-full rounded-md bg-gray-200 animate-pulse', className)}
    ></span>
  );
}
