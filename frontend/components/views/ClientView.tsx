import { DynamicSections } from '../layout/DynamicSections/DynamicSections';
import { DynamicSection } from '../layout/DynamicSections/DynamicSection';
import { DashboardSection } from '../DashboardSection';

import CaseSearchSection from '../CaseSearchSection';

export function ClientView() {
  return (
    <div>
      <main>
        <DynamicSections sectionsNames={['Geral', 'Processos']}>
          <DynamicSection>
            <DashboardSection />
          </DynamicSection>
          <DynamicSection>
            <CaseSearchSection />
          </DynamicSection>
        </DynamicSections>
      </main>
    </div>
  );
}
