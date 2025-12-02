'use client';
import { useContext, useState } from 'react';
import { CaseSearchBar } from './CaseSearchBar';
import { CaseSearchContainer } from './CaseSearchContainer';
import { UserDataContext } from '@/contexts/UserDataContext';
import { CaseQueryTypeEnum } from './CaseQueryTypeEnum';

export default function CaseSearchSection() {
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState<CaseQueryTypeEnum>(CaseQueryTypeEnum.num_processo);

  const context = useContext(UserDataContext);
    if (!context) {
      return <div>User data not found</div>;
    }

    const userData = context.userData

  return (
    <section>
      <div className="flex flex-col">
        <CaseSearchBar
          query={query}
          setQuery={setQuery}
          queryType={queryType}
          setQueryType={setQueryType}
        />
      </div>
      <CaseSearchContainer query={query} queryType={queryType} userData={userData}/>
    </section>
  );
}
