import { CardDropdown } from '../CardDropdown/CardDropdown';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { twMerge } from 'tailwind-merge';
import { MouseEvent, useState } from 'react';
import { CardMoreButton } from './CardMoreButton';
import { autoUpdate, flip, FloatingPortal, offset, shift, useFloating } from '@floating-ui/react';

interface Props {
  className?: string;
  onClick?: () => void;
  actions?: CardAction[];
  children: React.ReactNode;
}

Card.MoreButton = CardMoreButton;

export function Card({ actions, onClick, children, className }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: 'left-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), shift()],
  });

  function handleOpenDropdown(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsDropdownOpen(true);
  }

  function renderMoreButton() {
    if (!actions) return;
    return (
      <Card.MoreButton
        ref={refs.setReference}
        className="group flex justify-center items-center p-[4px] hover:bg-[var(--color-primary)] transition-[background] duration-300"
        onClick={handleOpenDropdown}
      />
    );
  }

  function renderDropdown() {
    if (!isDropdownOpen || !actions) return;
    return (
      <CardDropdown
        reference={refs.reference.current}
        floatingReference={refs.setFloating}
        floatingStyles={floatingStyles}
        actions={actions}
        close={() => setIsDropdownOpen(false)}
      />
    );
  }

  const hoverStyles = onClick ? 'cursor-pointer' : '';
  const baseStyles = 'relative flex flex-col bg-color-white rounded-[8px]';

  return (
    <article className={twMerge(baseStyles, hoverStyles, className)} onClick={onClick}>
      <div className="absolute top-[8px] right-[8px]">{renderMoreButton()}</div>
      <div>{children}</div>
      <FloatingPortal>{renderDropdown()}</FloatingPortal>
    </article>
  );
}
