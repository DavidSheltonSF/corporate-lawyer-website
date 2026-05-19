import { CardDropdown } from '../CardDropdown/CardDropdown';
import { CardAction } from '@/components/ui/CardDropdown/types';
import { twMerge } from 'tailwind-merge';
import { MouseEvent, useState } from 'react';
import { CardMoreButton } from './CardMoreButton';

interface Props {
  className?: string;
  onClick?: () => void;
  actions?: CardAction[];
  children: React.ReactNode;
}

Card.MoreButton = CardMoreButton;

export function Card({ actions, onClick, children, className }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleOpenDropdown(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsDropdownOpen(true);
  }

  function renderMoreButton() {
    if (!actions) return;
    return (
      <Card.MoreButton
        className="group flex justify-center items-center p-[4px] hover:bg-[var(--color-primary)] transition-[background] duration-300"
        onClick={handleOpenDropdown}
      />
    );
  }

  function renderDropdown() {
    if (!isDropdownOpen || !actions) return;
    return <CardDropdown actions={actions} close={() => setIsDropdownOpen(false)} />;
  }

  const hoverStyles = onClick ? 'cursor-pointer' : '';
  const baseStyles = 'relative flex flex-col bg-color-white rounded-[8px]';

  return (
    <article className={twMerge(baseStyles, hoverStyles, className)} onClick={onClick}>
      {renderDropdown()}
      <div className="absolute top-[8px] right-[8px]">{renderMoreButton()}</div>
      <div>{children}</div>
    </article>
  );
}
