import { HeroSection } from '../components/HeroSection';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans bg-color-black">
      <HeroSection additionalStyles="h-[320px] items-end" background="var(--blue-gradient)">
        <div className="flex flex-col gap-[16px] justify-end w-full mb-[40px] px-[40px] lg:pl-[160px] bg-[var(--black-color)]/40 h-fit text-color-white">
          <h1 className="text-3xl lg:text-5xl font-bold ">Contate-nos</h1>
          <p className="lg:text-[1.5rem] lg:w-[50%]">
            Precisa de apoio jurítico ou consultorria? Envie-nos uma mensagem e entraremos em
            contato o mais breve possível
          </p>
        </div>
      </HeroSection>
      <section className="flex flex-1 min-h-[70vh] items-center justify-center">
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
      </section>
    </div>
  );
}
