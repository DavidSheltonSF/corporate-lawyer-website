import { Activity } from 'react';
import { Text } from './ui/Text';

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
          <Text as={'h1'} variant="h1" className="font-bold lg:w-[50%]">
            {title}
          </Text>
          <Activity mode={description !== undefined ? 'visible' : 'hidden'}>
            <Text as={'h2'} variant="h2" className="lg:w-[50%]">
              {description}
            </Text>
          </Activity>
        </div>
      </div>
    </div>
  );
}
