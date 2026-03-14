'use client';
import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { WithId } from '@/types/WithId';
import { Pagination } from './Pagination';
import { CaseModal } from './modals/CaseModal';
import { ClientsList } from './ClientsList';
import { getClients } from '@/services/getClients';
import { SafeUser } from '@/types/SafeUser';
import { RegisterUserModal } from './modals/RegisterUserModal';
import { Button } from './Button';

export default function ClientSearchSection() {
  const [query, setQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [clients, setClients] = useState<WithId<SafeUser>[]>([]);
  const [casesLoading, setCasesLoading] = useState(false);
  const [registerUserModalIsOpen, setRegisterUserModalIsOpen] = useState(false);

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
      <RegisterUserModal isOpen={registerUserModalIsOpen} setIsOpen={setRegisterUserModalIsOpen} />
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <SearchBar
          handleClick={() => {
            loadClients(1);
          }}
          setQuery={setQuery}
        />
        <Button fontSize='1.2rem' onclick={() => setRegisterUserModalIsOpen(true)}>Novo Cliente</Button>
      </div>
      <ClientsList loading={casesLoading} clients={clients} />
      <Pagination pageIndex={pageIndex} reloadByPageIndex={loadClients} totalPage={totalPage} />
    </section>
  );
}
