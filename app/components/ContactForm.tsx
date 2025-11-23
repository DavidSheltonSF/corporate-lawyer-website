'use client';

export function ContactForm() {
  return (
    <form
      className="flex flex-col w-[90%] lg:w-[480px] bg-color-primary border-[2px] border-color-primary-light rounded-[16px] px-[24px] py-[40px]  gap-[32px] text-color-white text-xl"
      action=""
    >
      <div className="flex flex-col gap-[8px] w-full">
        <label className="" htmlFor="input-name">
          Nome
        </label>
        <div className="flex flex-colg:flex-row justify-between">
          <span className="flex gap-[8px] border-b-[2px] border-color-primary-light w-[45%]">
            <img className="size-[32px]" src="icons/user-primary-light.svg" alt="" />
            <input
              id="input-name"
              className="w-full placeholder:text-[var(--primary-color-light)]"
              type="text"
              placeholder="Primeiro"
            />
          </span>
          <span className="flex border-b-[2px] border-color-primary-light w-[45%]">
            <input
              className="w-full placeholder:text-[var(--primary-color-light)]"
              type="text"
              placeholder="Segundo"
            />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[8px] w-full">
        <label className="" htmlFor="input-email">
          Email
        </label>
        <span className="flex w-full gap-[8px] border-b-[2px] border-color-primary-light">
          <img className="size-[32px]" src="icons/email-primary-light.svg" alt="" />
          <input id="input-email" className=" w-full" type="text" />
        </span>
      </div>
      <div className="">
        <textarea
          className="border-[2px] border-color-primary-light w-full rounded-[2px] no-scrollbar p-[8px] placeholder:text-[var(--primary-color-light)]"
          placeholder="Assunto"
        />
      </div>
      <button className="w-full bg-[var(--primary-color-light)] rounded-full font-bold h-[40px] hover:brightness-124 transition-all duration-[300ms] cursor-pointer">
        Enviar
      </button>
    </form>
  );
}
