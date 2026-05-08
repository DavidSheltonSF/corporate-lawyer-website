import { reduceString } from '@/lib/reduceString';
import { TooltipContainer } from '@/components/TooltipContainer';
import { VerticalMoreIcon } from '@/components/icons/VerticalMoreIcon';

interface Props {
  title: string;
  openModal: Function;
  openOptionsModal: Function;
  children: React.ReactNode;
}

export function Card({ title, openModal, openOptionsModal, children }: Props) {
  return (
    <article className="flex flex-col fade-in-animation  bg-color-primary w-full min-md:w-[80%] min-lg:w-[656px] min-h-[280px] h-max rounded-xl cursor-pointer">
      <header className="flex items-center justify-center min-md:justify-between w-full p-[16px] min-md:p-[24px]">
        <TooltipContainer
          label={title}
          tooltipLabelProps={{
            color: '#ffd000ff',
            backgroundColor: '#000',
            position: {
              bottom: '115%',
              left: '50%',
              translateX: '-50%',
            },
          }}
        >
          <h1 className="h-fit font-bold text-center min-md:text-start text-xl min-md:text-3xl">
            {reduceString(title, 35)}
          </h1>
        </TooltipContainer>
        <button
          className="cursor-pointer"
          onClick={() => {
            openOptionsModal();
          }}
        >
          <VerticalMoreIcon color="var(--white-color)" height="32px" width="32px" />
        </button>
      </header>
      <div
        onClick={() => {
          openModal();
        }}
        className="flex flex-1 flex-col gap-[16px] px-[24px] py-[16px] bg-color-white text-color-black text-lg"
        style={{
          borderRadius: 'inherit',
        }}
      >
        {children}
      </div>
    </article>
  );
}
