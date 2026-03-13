'use client';
import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { WithId } from '@/types/WithId';
import { Pagination } from './Pagination';
import { CaseModal } from './modals/CaseModal';
import { ClientsList } from './ClientsList';
import { getClients } from '@/services/getClients';
import { SafeUser } from '@/types/SafeUser';

export default function ClientSearchSection() {
  const [query, setQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [clients, setClients] = useState<WithId<SafeUser>[]>([]);
  const [casesLoading, setCasesLoading] = useState(false);

  async function loadClients(page: number) {
    setCasesLoading(true);
    setPageIndex(page);
    const clientsPagination = await getClients(
      {
        page,
        limit: 4,
        query,
      },
      ['client', 'lawyers']
    );

    const casesData = clientsPagination.data;
    setTotalPage(clientsPagination.meta.totalPages);

    setClients(casesData);
    setCasesLoading(false);
  }

  useEffect(() => {
    loadClients(1);
  }, []);

  return (
    <section className="flex flex-col items-center relative size-full">
      <CaseModal />
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <SearchBar
          handleClick={() => {
            loadClients(1);
          }}
          setQuery={setQuery}
        />
        <div className="h-[48px] rounded-full w-[180px]"></div>
      </div>
      <ClientsList loading={casesLoading} clients={clients} />
      <Pagination pageIndex={pageIndex} reloadByPageIndex={clients} totalPage={totalPage} />
    </section>
  );
}
