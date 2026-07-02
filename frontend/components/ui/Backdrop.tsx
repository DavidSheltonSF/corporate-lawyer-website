'use client';

import { PropsWithChildren, Ref, useState } from 'react';

interface Props {
  ref: Ref<HTMLDivElement>;
}

export function Backdrop({ children, ref }: PropsWithChildren<Props>) {
  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 h-[100vh] w-[100vw] bg-black/20 z-30 fade-in-animation"
    >
      {children}
    </div>
  );
}
