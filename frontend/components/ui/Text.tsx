import { ElementType, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type TextVariant = 'body' | 'muted' | 'h1' | 'h2' | 'h3';

interface TextProps {
  as?: ElementType;
  variant?: TextVariant;
  className?: string;
}

export function Text({ as, variant = 'body', className, children }: PropsWithChildren<TextProps>) {
  const variants: Record<TextVariant, string> = {
    body: 'text-sm min-lg:text-base',
    muted: 'text-xs lg:text-sm text-[var(--color-muted)]',
    h1: 'text-xl lg:text-3xl font-bold',
    h2: 'text-lg lg:text-2xl font-semibold',
    h3: 'text-base lg:text-lg font-semibold',
  };

  const DynamicTag = as || 'p';

  return <DynamicTag className={twMerge(variants[variant], className)}>{children}</DynamicTag>;
}
