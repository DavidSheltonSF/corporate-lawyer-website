import { DynamicSections } from '../layout/DynamicSections/DynamicSections';
import { DynamicSection } from '../layout/DynamicSections/DynamicSection';
import { DashboardSection } from '../DashboardSection';

import CaseSearch from '../features/cases/CaseSearch';
import ClientSearch from '../features/clients/ClientSearch';

export function LawyerView() {
  return (
    <div>
      <main>
        <DynamicSections sectionsNames={['Geral', 'Processos', 'Clientes']}>
          <DynamicSection>
            <DashboardSection />
          </DynamicSection>
          <DynamicSection>
            <CaseSearch />
          </DynamicSection>
          <DynamicSection>
            <ClientSearch />
          </DynamicSection>
        </DynamicSections>
      </main>
    </div>
  );
}
