import { DynamicSections } from '../layout/DynamicSections/DynamicSections';
import { DynamicSection } from '../layout/DynamicSections/DynamicSection';
import { DashboardSection } from '../DashboardSection';

import CaseSearchSection from '../features/cases/CaseSearchSection';
import ClientSearchSection from '../features/clients/ClientsSearchSection';

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
            <ClientSearchSection />
          </DynamicSection>
        </DynamicSections>
      </main>
    </div>
  );
}
