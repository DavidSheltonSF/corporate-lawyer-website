import { VerticalMoreIcon } from '@/components/icons/VerticalMoreIcon';
import { Button } from '../Button/Button';

interface Props {
  className?: string;
  openModal: Function;
  openOptionsModal: Function;
  children: React.ReactNode;
}

export function Card({ openModal, openOptionsModal, children, className }: Props) {
  return (
    <article
      className={`relative flex flex-col bg-color-white rounded-[8px] ${className}`}
      onClick={() => openModal()}
    >
      <div className="absolute top-[8px] right-[8px]">
        <Button
          className="flex justify-center items-center p-[4px] siz-fit bg-color-white hover:brightness-95"
          onclick={(e) => {
            e.stopPropagation();
            openOptionsModal();
          }}
        >
          <VerticalMoreIcon width="32px" height="32px" />
        </Button>
      </div>
      <div>{children}</div>
    </article>
  );
}
