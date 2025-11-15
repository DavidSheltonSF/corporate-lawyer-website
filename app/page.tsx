'use client';
import { useState } from 'react';
import { DynamicSection } from './components/DynamicSection';
import { SubNavbar } from './components/SubNavbar';
import { ServiceCard } from './components/ServiceCard';
import { DraggableCarousel } from './components/DraggableCarousel';
import { ProfessionalCard } from './components/ProfessionalCard';
import { HeroSection } from './components/HeroSection';

export default function Home() {
  const [selectedSection, setSelectedSection] = useState(0);

  const professionalsData = [
    {
      imagePath: 'photos/carla-224px.webp',
      title: 'Dr. Carla Medeiros',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam non fugit magnam
            facere nam iusto sint natus libero dignissimos! Nesciunt animi provident, asperiores aut
            accusantium explicabo sint saepe dicta.`,
      specializations: ['trabalhista', 'previdenciario'],
      emailLink: '#',
      whatsAppLink: '#',
    },
    {
      imagePath: 'photos/flavia-224px.webp',
      title: 'Dr. Flávia Santiago',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam non fugit magnam
            facere nam iusto sint natus libero dignissimos! Nesciunt animi provident, asperiores aut
            accusantium explicabo sint saepe dicta.`,
      specializations: ['familia', 'civil'],
      emailLink: '#',
      whatsAppLink: '#',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans bg-color-white">
      <HeroSection additionalStyles="h-[50vh] min-lg:h-[70vh]" background="url(/hero-image.webp)">
        <div className="flex flex-col justify-end w-full mb-[40px] max-md:px-[40px] min-lg:pl-[80px] bg-[var(--black-color)]/40 h-fit text-color-white">
          <h1 className="text-[1.5rem] lg:text-[2rem] font-bold lg:w-[50%]">
            ESCRITÓRIO DE ADVOCACIA MEDEIROS E SANTIAGO
          </h1>
        </div>
      </HeroSection>
      <main className="w-full">
        <section className="flex flex-col items-center bg-color-black w-full min-h-[90vh] h-auto pb-[80px]">
          <SubNavbar
            itemsNames={['Sobre nós', 'Serviços', 'Equipe']}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
          <div className="flex justify-center items-center w-[80%] h-full">
            <DynamicSection
              index={0}
              title="Sobre Nós"
              selectedSection={selectedSection}
              additionalStyle="text-[1rem] lg:text-[1rem]"
            >
              <div className="flex flex-col gap-[32px] w-[70%]">
                <div className="flex flex-col gap-[24px]">
                  <h3 className="text-color-secondary font-bold">Somos experiêntes</h3>
                  <p>
                    Com mais de 5 anos prestando atendimento com empatia, ética e dedicação, somos
                    um escritório de advocacia comprometido em oferecer soluções jurídicas eficazes
                    e humanizadas.
                  </p>
                </div>
                <div className="flex flex-col gap-[24px]">
                  <h3 className="text-color-secondary font-bold">Diversificados</h3>
                  <p>
                    Atuamos em diversas áreas do Direito, com destaque para Direito de Família,
                    Previdenciário, Trabalhista e Civil, sempre buscando garantir os melhores
                    resultados para cada cliente, de forma personalizada e transparente.
                  </p>
                </div>
                <div className="flex flex-col gap-[24px]">
                  <h3 className="text-color-secondary font-bold">Também somos adaptáveis</h3>
                  <p>
                    Além disso, somos um escritório moderno e adaptável, que utiliza tecnologias
                    inovadoras para agilizar atendimentos, acompanhar processos e oferecer suporte
                    jurídico de excelência, onde quer que você esteja.
                  </p>
                </div>
              </div>
            </DynamicSection>
            <DynamicSection index={1} title="Serviços" selectedSection={selectedSection}>
              <div className="flex flex-col gap-[32px] w-full h-full flex-1">
                <DraggableCarousel additionalStyles="w-full h-[512px] bg-black select-none rounded-xl gap-[80px] max-md:px-[16px] px-[80px]">
                  <ServiceCard
                    title="Família"
                    image="icons/familia.svg"
                    content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dicta, incidunt cum
          sapiente libero officiis beatae recusandae quidem, magnam illum adipisci aspernatur, in
          vero similique vitae autem aliquid natus nisi."
                  />
                  <ServiceCard
                    title="Trabalhista"
                    image="icons/trabalhista.svg"
                    content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dicta, incidunt cum
          sapiente libero officiis beatae recusandae quidem, magnam illum adipisci aspernatur, in
          vero similique vitae autem aliquid natus nisi."
                  />
                  <ServiceCard
                    title="Cívil"
                    image="icons/civil.svg"
                    content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dicta, incidunt cum
          sapiente libero officiis beatae recusandae quidem, magnam illum adipisci aspernatur, in
          vero similique vitae autem aliquid natus nisi."
                  />
                  <ServiceCard
                    title="Previdenciário"
                    image="icons/previdenciario.svg"
                    content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat dicta, incidunt cum
          sapiente libero officiis beatae recusandae quidem, magnam illum adipisci aspernatur, in
          vero similique vitae autem aliquid natus nisi."
                  />
                </DraggableCarousel>
              </div>
            </DynamicSection>
            <DynamicSection index={2} title="Equipe" selectedSection={selectedSection}>
              <div className="flex flex-col gap-[40px]">
                <ProfessionalCard {...professionalsData[0]} />
                <ProfessionalCard {...professionalsData[1]} />
              </div>
            </DynamicSection>
          </div>
        </section>
      </main>
    </div>
  );
}
