import { DynamicSections } from '../layout/DynamicSections/DynamicSections';
import { DynamicSection } from '../layout/DynamicSections/DynamicSection';
import { DashboardSection } from '../DashboardSection';

import CaseSearch from '../features/cases/CaseSearch';

export function ClientView() {
  return (
    <div>
      <main>
        <DynamicSections sectionsNames={['Geral', 'Processos']}>
          <DynamicSection>
            <DashboardSection />
          </DynamicSection>
          <DynamicSection>
            <CaseSearch />
          </DynamicSection>
        </DynamicSections>
      </main>
    </div>
  );
}
