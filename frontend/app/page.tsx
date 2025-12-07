'use client';
import { useState } from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { DraggableCarousel } from '../components/DraggableCarousel';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { HeroSection } from '../components/HeroSection';
import { professionalsInfo } from '@/data/professionalsInfo';
import { servicesDetails } from '@/data/servicesDetails';
import { ServiceDetailsModal } from '../components/ServiceDetailsModal';
import { ModalWindow } from '../components/ModalWindow';
import { ModalContext } from '../contexts/ModalContext';
import { Carousel } from '../components/Carousel';
import { DynamicSections } from '@/components/DynamicSections';
import { DynamicSection } from '@/components/DynamicSection';

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [serviceAreaId, setServiceAreaId] = useState('');

  return (
    <div className="bg-color-black">
      <ModalWindow modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <ServiceDetailsModal serviceAreaId={serviceAreaId} />
      </ModalWindow>
      <HeroSection
        title="ESCRITÓRIO DE ADVOCACIA MEDEIROS E SANTIAGO"
        additionalStyles="h-[50vh] min-lg:h-[70vh]"
        background="url(/hero-image.webp)"
        textBackgroundColor="#00000059"
      />

      <main>
        <ModalContext value={{ modalIsOpen, setModalIsOpen, serviceAreaId, setServiceAreaId }}>
          <DynamicSections sectionsNames={['Sobre Nós', 'Serviços', 'Equipe']}>
            <DynamicSection>
              <div className="flex flex-col gap-[32px] lg:w-[70%] text-[1.5rem]">
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[1.7rem] text-color-secondary font-bold">
                    Somos experiêntes
                  </h3>
                  <p>
                    Com mais de 5 anos prestando atendimento com empatia, ética e dedicação, somos
                    um escritório de advocacia comprometido em oferecer soluções jurídicas eficazes
                    e humanizadas.
                  </p>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[1.7rem] ] text-color-secondary font-bold">Diversificados</h3>
                  <p>
                    Atuamos em diversas áreas do Direito, com destaque para Direito de Família,
                    Previdenciário, Trabalhista e Civil, sempre buscando garantir os melhores
                    resultados para cada cliente, de forma personalizada e transparente.
                  </p>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <h3 className="text-[1.7rem] text-color-secondary font-bold">
                    Também somos adaptáveis
                  </h3>
                  <p>
                    Além disso, somos um escritório moderno e adaptável, que utiliza tecnologias
                    inovadoras para agilizar atendimentos, acompanhar processos e oferecer suporte
                    jurídico de excelência, onde quer que você esteja.
                  </p>
                </div>
              </div>
            </DynamicSection>
            <DynamicSection>
              <div className="flex flex-col gap-[32px] w-full h-full flex-1">
                <Carousel>
                  <ServiceCard serviceDetails={servicesDetails['familia']} />
                  <ServiceCard serviceDetails={servicesDetails['trabalhista']} />
                  <ServiceCard serviceDetails={servicesDetails['civil']} />
                  <ServiceCard serviceDetails={servicesDetails['previdenciario']} />
                </Carousel>
              </div>
            </DynamicSection>
            <DynamicSection>
              <div className="flex flex-col gap-[40px]">
                <ProfessionalCard {...professionalsInfo[0]} />
                <ProfessionalCard {...professionalsInfo[1]} />
              </div>
            </DynamicSection>
          </DynamicSections>
        </ModalContext>
      </main>
    </div>
  );
}
