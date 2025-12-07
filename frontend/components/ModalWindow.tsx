import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
  modalIsOpen: boolean;
  setModalIsOpen: any;
}

export function ModalWindow({ modalIsOpen, setModalIsOpen, children }: Props) {
  useEffect(() => {
    const modalWindow: HTMLElement | null = document.querySelector('.modal-window');

    function openModal() {
      modalWindow?.classList.remove('hidden');
      modalWindow?.classList.add('fade-in-animation-fast');
      modalWindow?.classList.remove('fade-out-animation');
    }

    function closeModal() {
      modalWindow?.classList.add('fade-out-animation');
      modalWindow?.classList.remove('fade-in-animation-fast');
    }

    modalIsOpen ? openModal() : closeModal();
  }, [modalIsOpen]);

  function handleClick() {
    setModalIsOpen(false);
  }

  return (
    <div
      className={`flex flex-col hidden modal-window z-9999 flex-col fixed left-[50%] translate-x-[-50%] top-[10vh] lg:top-[15vh]  w-[80%] md:w-[50%] lg:w-[30rem] min-h-[25rem] rounded-xl p-[16px] text-color-white font-bold bg-color-black-dark border border-color-secondary`}
    >
      <div>{children}</div>

      <button
        className="self-end w-full rounded-full py-[8px] lg:absolute lg:w-[88px] lg:rounded-md right-[16px] bottom-[16px] bg-color-secondary text-color-black font-bold cursor-pointer hover:brightness-150"
        onClick={handleClick}
      >
        Ok
      </button>
    </div>
  );
}
