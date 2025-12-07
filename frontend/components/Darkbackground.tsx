import { ReactNode } from 'react';

export function Darkbackground({ children }: { children: ReactNode }) {
  return (
    <div className="absolute flex w-full h-full bg-color-black-dark opacity-[50%]">{children}</div>
  );
}
