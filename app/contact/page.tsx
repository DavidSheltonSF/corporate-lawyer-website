'use server';
import { sendContactMessage } from '../../actions/sendContactMessage';
import { Form } from '../../components/Form';
import { HeroSection } from '../../components/HeroSection';
import { InputForm } from '../../components/InputForm';

export default async function Contact() {
  return (
    <div className="bg-color-black">
      <HeroSection additionalStyles="h-[280px] items-end" background="var(--blue-gradient)">
        <div className="flex flex-col gap-[16px] justify-end w-full mb-[40px] px-[40px] lg:pl-[160px] h-fit text-color-white">
          <h1 className="text-3xl lg:text-5xl font-bold ">Contate-nos</h1>
          <p className="lg:text-[1.5rem] lg:w-[50%]">
            Precisa de apoio jurítico ou consultorria? Envie-nos uma mensagem e entraremos em
            contato o mais breve possível
          </p>
        </div>
      </HeroSection>
      <section className="flex  h-[90vh] lg:h-[70vh] items-center justify-center items-center w-full">
        <Form action={sendContactMessage}>
          <div className="flex flex items-end gap-[16px] w-full">
            <InputForm
              id="input-first-name"
              name="firstName"
              label="Nome"
              type="text"
              iconPath="icons/user-primary-light.svg"
              placeholder="Primeiro"
              required={true}
            />
            <InputForm
              id="input-first-name"
              name="secondName"
              type="text"
              placeholder="Segundo"
              required={true}
            />
          </div>
          <InputForm
            id="input-email"
            name="email"
            label="Email"
            type="email"
            iconPath="icons/email-primary-light.svg"
            required={true}
          />
          <div className="">
            <textarea
              name="message"
              className="border-[2px] border-color-primary-light w-full rounded-[2px] no-scrollbar p-[8px] placeholder:text-[var(--primary-color-light)]"
              placeholder="Assunto"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--primary-color-light)] rounded-full font-bold h-[40px] hover:brightness-124 transition-all duration-[300ms] cursor-pointer"
          >
            Enviar
          </button>
        </Form>

        {/* Google Contact form */}
        {/* <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdUNMA9P3X0k89s14maNWvZZH2T0lsoD_Ha9q5uGvB-8AnhBA/viewform?embedded=true"
          width=""
          height=""
          className='lg:pt-[80px] h-full w-full md:w-[70%] lg:w-[640px]'
        >
          Loading…
        </iframe> */}
      </section>
    </div>
  );
}
