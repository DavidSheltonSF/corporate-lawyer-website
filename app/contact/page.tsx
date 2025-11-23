import { ContactForm } from '../components/ContactForm';
import { HeroSection } from '../components/HeroSection';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans bg-color-black">
      <HeroSection additionalStyles="h-[280px] items-end" background="var(--blue-gradient)">
        <div className="flex flex-col gap-[16px] justify-end w-full mb-[40px] px-[40px] lg:pl-[160px] h-fit text-color-white">
          <h1 className="text-3xl lg:text-5xl font-bold ">Contate-nos</h1>
          <p className="lg:text-[1.5rem] lg:w-[50%]">
            Precisa de apoio jurítico ou consultorria? Envie-nos uma mensagem e entraremos em
            contato o mais breve possível
          </p>
        </div>
      </HeroSection>
      <section className="flex  h-[140vh] lg:h-[120vh] items-center justify-center items-center w-full">
        {/* <ContactForm /> */}

        {/* Google Contact form */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdUNMA9P3X0k89s14maNWvZZH2T0lsoD_Ha9q5uGvB-8AnhBA/viewform?embedded=true"
          width=""
          height=""
          className='lg:pt-[80px] h-full w-full md:w-[70%] lg:w-[640px]'
        >
          Loading…
        </iframe>
      </section>
    </div>
  );
}
