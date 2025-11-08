'use client';
import { useState } from 'react';
import { DynamicSection } from './components/DynamicSection';
import { SubNavbar } from './components/SubNavbar';

export default function Home() {
  const [selectedSection, setSelectedSection] = useState(0);
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans bg-color-white">
      <header className="w-full">
        <div className="flex items-end bg-[url(/hero-image.png)] w-full h-[728px] bg-cover bg-center">
          <h1 className="text-[64px] font-bold text-white w-[936px] ml-[160px] mb-[40px]">
            ESCRITÓRIO DE ADVOCACIA MEDEIROS E SANTIAGO
          </h1>
        </div>
      </header>
      <main className="w-full">
        <section className="flex flex-col items-center bg-color-black w-full h-[90vh]">
          <SubNavbar
            itemsNames={['Sobre nós', 'Serviços', 'Equipe']}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
          <div className="flex justify-center items-center w-full h-full">
            <DynamicSection index={0} title="Sobre Nós" selectedSection={selectedSection}>
              <div className="flex flex-col gap-[32px] w-[736px]">
                <div className="flex flex-col gap-[24px]">
                  <h3 className="text-color-secondary font-bold">Somos experiêntes</h3>
                  <p>
                    Com mais de 5 anos prestando atendimento com empatia, ética e dedicação, somos
                    um escritório de advocacia comprometido em oferecer soluções jurídicas eficazes
                    e humanizadas.
                  </p>
                </div>
                <div className="flex flex-col gap-[24px]">
                  <h3 className="text-color-secondary font-bold">Somos experiêntes</h3>
                  <p>
                    Com mais de 5 anos prestando atendimento com empatia, ética e dedicação, somos
                    um escritório de advocacia comprometido em oferecer soluções jurídicas eficazes
                    e humanizadas.
                  </p>
                </div>
                <div className="flex flex-col gap-[24px]">
                  <h3 className="text-color-secondary font-bold">Somos experiêntes</h3>
                  <p>
                    Com mais de 5 anos prestando atendimento com empatia, ética e dedicação, somos
                    um escritório de advocacia comprometido em oferecer soluções jurídicas eficazes
                    e humanizadas.
                  </p>
                </div>
              </div>
            </DynamicSection>
          </div>
        </section>
      </main>
    </div>
  );
}
