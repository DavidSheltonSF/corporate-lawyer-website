import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  modalIsOpen: boolean;
  setModalIsOpen: any;
}

export function ModalWindow({ modalIsOpen, setModalIsOpen, children }: Props) {
  function handleClickOk() {
    setModalIsOpen(false);
  }

  return (
    <div
      className={`flex z-9999 flex-col fixed left-[50%] translate-x-[-50%] top-[10vh] lg:top-[15vh]  w-[80%] lg:w-[30rem] min-h-[25rem] rounded-xl p-[16px] text-color-white font-bold bg-color-black-dark border border-color-secondary ${
        !modalIsOpen ? 'hidden' : ''
      }`}
    >
      <div>{children}</div>

      <button
        className="self-end w-full lg:w-[88px] rounded-full lg:rounded-md bg-color-secondary text-color-black font-bold py-[8px] cursor-pointer hover:brightness-150"
        onClick={handleClickOk}
      >
        Ok
      </button>
    </div>
  );
}
