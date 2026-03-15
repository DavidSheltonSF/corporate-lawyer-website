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
import { RequestState } from '@/types/RequestState';

export default function ClientSearchSection() {
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [query, setQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [clients, setClients] = useState<WithId<SafeUser>[]>([]);
  const [registerUserModalIsOpen, setRegisterUserModalIsOpen] = useState(false);

  async function loadClients(page: number) {
    try {
      setRequestState({ status: 'loading' });
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
      setRequestState({ status: 'ok' });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
    }
  }

  useEffect(() => {
    loadClients(1);
  }, []);

  return (
    <section className="flex flex-col items-center size-full">
      <RegisterUserModal isOpen={registerUserModalIsOpen} setIsOpen={setRegisterUserModalIsOpen} />
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <SearchBar
          handleClick={() => {
            loadClients(1);
          }}
          setQuery={setQuery}
        />
        <div className="w-full min-lg:w-[200px]">
          <Button fontSize="1.2rem" onclick={() => setRegisterUserModalIsOpen(true)}>
            Novo Cliente
          </Button>
        </div>
      </div>
      <ClientsList requestState={requestState} clients={clients} />
      <Pagination pageIndex={pageIndex} reloadByPageIndex={loadClients} totalPage={totalPage} />
    </section>
  );
}
