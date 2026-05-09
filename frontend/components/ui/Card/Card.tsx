import { VerticalMoreIcon } from '@/components/icons/VerticalMoreIcon';

interface Props {
  openModal: Function;
  openOptionsModal: Function;
  children: React.ReactNode;
}

export function Card({ openModal, openOptionsModal, children }: Props) {
  return (
    <article className="flex flex-col fade-in-animation bg-color-primary w-full min-md:w-[80%] min-lg:w-[656px] min-h-[280px] h-max rounded-xl cursor-pointer">
      <header className="flex justify-end w-full p-[16px]">
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
          borderBottomLeftRadius: 'inherit',
          borderBottomRightRadius: 'inherit',
        }}
      >
        {children}
      </div>
    </article>
  );
}
