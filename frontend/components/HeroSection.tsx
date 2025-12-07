import { Activity } from 'react';

interface Props {
  title: string;
  description?: string;
  textBackgroundColor?: string;
  background: string;
  additionalStyles: string;
}

export function HeroSection({
  background,
  additionalStyles,
  title,
  description,
  textBackgroundColor,
}: Props) {
  return (
    <div
      className={`flex items-end font-bold w-full ${additionalStyles}`}
      style={{
        background,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full  mb-[40px]" style={{ backgroundColor: textBackgroundColor }}>
        <div className="flex flex-col gap-[16px] justify-end px-[24px] lg:pl-[160px] h-fit text-color-white">
          <h1 className="text-3xl lg:text-5xl font-bold lg:w-[50%]">{title}</h1>
          <Activity mode={description !== undefined ? 'visible' : 'hidden'}>
            <p className="lg:text-[1.5rem] lg:w-[50%]">{description}</p>
          </Activity>
        </div>
      </div>
    </div>
  );
}
