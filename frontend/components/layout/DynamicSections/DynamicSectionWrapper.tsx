import { Text } from '@/components/ui/Text';
import { ReactNode } from 'react';

interface Props {
  index: number;
  title: string;
  selectedSection: number;
  children: ReactNode;
}

export function DynamicSectionWrapper({ index, title, selectedSection, children }: Props) {
  const isSelected = index === selectedSection;

  return (
    isSelected && (
      <section className="flex flex-col fade-in-animation w-full h-full">
        <Text as={'h2'} variant="h2" className="my-[40px]">
          {title}
        </Text>
        {children}
      </section>
    )
  );
}
