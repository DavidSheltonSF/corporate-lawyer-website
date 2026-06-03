'use client';
import { useEffect, useState } from 'react';
import { SearchBar } from '../../ui/Search/SearchBar';
import { WithId } from '@/types/WithId';
import { Pagination } from '../../Pagination';
import { CaseModal } from '../cases/CaseModal/CaseModal';
import { ClientsList } from './ClientsList';
import { getClients } from '@/services/users/getClients';
import { SafeUser } from '@/types/SafeUser';
import { RegisterClientModal } from '../../modals/RegisterClientModal';
import { Button } from '../../ui/Button/Button';
import { RequestState } from '@/types/RequestState';
import { Page } from '@/types/Page';

export default function ClientSearch() {
  const [requestState, setRequestState] = useState<RequestState<WithId<SafeUser>[]>>({
    status: 'idle',
  });
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [registerUserModalIsOpen, setRegisterUserModalIsOpen] = useState(false);

  async function loadClients() {
    setRequestState({ status: 'loading' });
    const response = await getClients({
      page,
      limit: 4,
      query,
    });

    if (!response.success) {
      setRequestState({ ...response, status: 'error' });
      return;
    }

    const { data } = response;

    setTotalPage(data.meta.totalPages);
    setRequestState({ status: 'ok', data: data.data });
  }

  useEffect(() => {
    loadClients();
  }, [page]);

  return (
    <section className="flex flex-col items-center size-full">
      <RegisterClientModal
        isOpen={registerUserModalIsOpen}
        setIsOpen={setRegisterUserModalIsOpen}
      />
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <SearchBar query={query} action={loadClients} setQuery={setQuery} />
        <div className="w-full min-lg:min-w-[200px]">
          <Button
            className="p-[16px] bg-color-white text-color-black w-full min-lg:w-fit"
            onClick={() => setRegisterUserModalIsOpen(true)}
          >
            Novo Cliente
          </Button>
        </div>
      </div>
      <ClientsList requestState={requestState} loadClients={loadClients} />
      <Pagination page={page} setPage={setPage} totalPage={totalPage} />
    </section>
  );
}
