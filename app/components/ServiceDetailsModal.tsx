interface Props {
  modalIsOpen: boolean;
  setModalIsOpen: any;
  modalData: Record<string, any>;
}

export function ServiceDetailsModal({ modalIsOpen, setModalIsOpen, modalData }: Props) {
  function handleClickOk() {
    setModalIsOpen(false);
  }

  const { title, services } = modalData;

  return (
    <div
      className={`flex z-9999 flex-col fixed left-[50%] translate-x-[-50%] top-[10vh] lg:top-[15vh]  w-[80%] lg:w-[30rem] min-h-[25rem] rounded-xl p-[16px] text-color-white font-bold bg-color-black-dark border border-color-secondary ${
        !modalIsOpen ? 'hidden' : ''
      }`}
    >
      <h3 className="font-bold text-2xl self-center">{title}</h3>
      <div className="flex flex-col gap-[8px] my-[16px] size-full scroll-hidden p-[8px] rounded-xl">
        <p className="text-xl">Prestamos os seguintes serviços:</p>
        <ul className="flex list-disc list-inside flex-col gap-[8px]">
          {services.map((service: any, index: number) => {
            return <li key={index}>{service}</li>;
          })}
        </ul>
      </div>
      <button
        className="self-end w-full lg:w-[88px] rounded-full lg:rounded-md bg-color-secondary text-color-black font-bold py-[8px] cursor-pointer hover:brightness-150"
        onClick={handleClickOk}
      >
        Ok
      </button>
    </div>
  );
}
