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
      <div className="absolute top-[8px] right-[8px] hover:bg-inherit">
        <Button
          paddingX="4px"
          paddingY="4px"
          width="auto"
          height="auto"
          darkHover
          onclick={(e) => {
            e.stopPropagation();
            openOptionsModal();
          }}
        >
          <span className="flex justify-center items-center">
            <VerticalMoreIcon width="24px" height="24px" />
          </span>
        </Button>
      </div>
      <div>{children}</div>
    </article>
  );
}
