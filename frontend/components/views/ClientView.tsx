import { DynamicSections } from '../DynamicSections';
import { DynamicSection } from '../DynamicSection';
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
