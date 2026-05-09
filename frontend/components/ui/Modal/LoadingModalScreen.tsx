import { LogoLoadingAnimated } from '@/components/LogoLoadingAnimated';

interface Props {
  width?: string;
  height?: string;
}
export function LoadingModalScreeen({ width, height }: Props) {
  return (
    <div
    className='flex justify-center items-center'
      style={{
        width,
        height,
      }}
    >
      <LogoLoadingAnimated />
    </div>
  );
}
