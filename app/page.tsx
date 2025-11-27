'use client';
import { useState } from 'react';
import { DynamicSection } from '../components/DynamicSection';
import { SubNavbar } from '../components/SubNavbar';
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

export default function Home() {
  const [selectedSection, setSelectedSection] = useState(0);

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
          <section className="flex flex-col items-center w-full min-h-[90vh] h-auto pb-[80px]">
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
                additionalStyle="text-[1.5rem]"
              >
                <div className="flex flex-col gap-[32px] lg:w-[70%]">
                  <div className="flex flex-col gap-[16px]">
                    <h3 className="text-[1.7rem] text-color-secondary font-bold">
                      Somos experiêntes
                    </h3>
                    <p>
                      Com mais de 5 anos prestando atendimento com empatia, ética e dedicação, somos
                      um escritório de advocacia comprometido em oferecer soluções jurídicas
                      eficazes e humanizadas.
                    </p>
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <h3 className="text-[1.7rem] ] text-color-secondary font-bold">
                      Diversificados
                    </h3>
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
              <DynamicSection index={1} title="Serviços" selectedSection={selectedSection}>
                <div className="flex flex-col gap-[32px] w-full h-full flex-1">
                  <Carousel>
                    <ServiceCard serviceDetails={servicesDetails['familia']} />
                    <ServiceCard serviceDetails={servicesDetails['trabalhista']} />
                    <ServiceCard serviceDetails={servicesDetails['civil']} />
                    <ServiceCard serviceDetails={servicesDetails['previdenciario']} />
                  </Carousel>
                </div>
              </DynamicSection>
              <DynamicSection index={2} title="Equipe" selectedSection={selectedSection}>
                <div className="flex flex-col gap-[40px]">
                  <ProfessionalCard {...professionalsInfo[0]} />
                  <ProfessionalCard {...professionalsInfo[1]} />
                </div>
              </DynamicSection>
            </div>
          </section>
        </ModalContext>
      </main>
    </div>
  );
}
