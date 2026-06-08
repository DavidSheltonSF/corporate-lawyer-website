import { LogoLoadingAnimated } from '@/components/LogoLoadingAnimated';
import Image from 'next/image';

export default function loading() {
  return (
    <div className="bg-color-primary-light h-[100vh] flex justify-center items-center">
      <LogoLoadingAnimated />
    </div>
  );
}
