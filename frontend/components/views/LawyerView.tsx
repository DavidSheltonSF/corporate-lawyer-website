import { DynamicSections } from '../DynamicSections';
import { DynamicSection } from '../DynamicSection';
import { DashboardSection } from '../DashboardSection';

import CaseSearchSection from '../CaseSearchSection';

export function LawyerView() {
  return (
    <div>
      <main>
        <DynamicSections sectionsNames={['Geral', 'Processos', 'Clientes']}>
          <DynamicSection>
            <DashboardSection />
          </DynamicSection>
          <DynamicSection>
            <CaseSearchSection />
          </DynamicSection>
          <DynamicSection>
            <div></div>
          </DynamicSection>
        </DynamicSections>
      </main>
    </div>
  );
}
