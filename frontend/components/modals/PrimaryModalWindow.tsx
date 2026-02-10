'use client';
interface Props {
  closeModal: Function;
  children: React.ReactNode;
}

export function PrimaryModalWindow(props: Props) {
  const { closeModal, children } = props;

  return (
    <div className="flex flex-col bg-color-primary size-full fade-in-animation-fast">
      <div className="flex justify-end items-center h-[56px] pr-[8px]">
        <button
          className="size-[40px] cursor-pointer hover:bg-white/20 transition-[background-color] duration-300 rounded-lg"
          onClick={() => {
            closeModal();
          }}
        >
          <img className="size-full" src="/icons/close.svg" alt="" />
        </button>
      </div>
      <div className="bg-color-white size-full overflow-y-auto min-lg:overflow-y-hidden">{children}</div>
    </div>
  );
}
