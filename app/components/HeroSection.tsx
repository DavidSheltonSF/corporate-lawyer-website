import { ReactNode } from 'react';

interface Props {
  background: string;
  additionalStyles: string;
  children: ReactNode;
}

export function HeroSection({ background, additionalStyles, children }: Props) {
  return (
    <div
      className={`flex text-2xl font-bold w-full ${additionalStyles}`}
      style={{
        background,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  );
}
