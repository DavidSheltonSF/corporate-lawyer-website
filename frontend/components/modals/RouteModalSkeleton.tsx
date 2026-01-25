'use client';

import { PrimaryModalWindow } from './PrimaryModalWindow';
import { LogoLoadingAnimated } from '../LogoLoadingAnimated';

export function RouteModalSkeleton() {
  return (
    <div className="fixed z-99999 left-1/2 translate-x-[-50%] top-[8px] min-lg:top-[80px] w-[95%] min-lg:w-[960px] h-[85vh] rounded-xl overflow-hidden">
      <PrimaryModalWindow closeModal={() => {}}>
        <div className="flex size-full justify-center items-center pt-[8px]">
          <LogoLoadingAnimated />
        </div>
      </PrimaryModalWindow>
    </div>
  );
}
