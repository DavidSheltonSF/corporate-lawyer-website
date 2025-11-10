import { HeroSection } from '../components/HeroSection';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans bg-color-white">
      <HeroSection additionalStyles="h-[320px] items-end" background="var(--blue-gradient)">
        <div className="flex flex-col ml-[160px] w-[936px] text-color-white gap-[16px] pb-[40px]">
          <h1 className="text-[64px] font-bold">Contate-nos</h1>
          <p>
            Precisa de apoio jurítico ou consultorria? Envie-nos uma mensagem e entraremos em
            contato o mais breve possível
          </p>
        </div>
      </HeroSection>
    </div>
  );
}
