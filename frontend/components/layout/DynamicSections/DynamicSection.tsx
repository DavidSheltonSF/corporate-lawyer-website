import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export function DynamicSection({ children }: Props) {
  return <section className='size-full'>{children}</section>;
}
