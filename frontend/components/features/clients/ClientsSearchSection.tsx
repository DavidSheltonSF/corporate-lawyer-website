'use client';
import { useEffect, useState } from 'react';
import { SearchBar } from '../../SearchBar';
import { WithId } from '@/types/WithId';
import { Pagination } from '../../Pagination';
import { CaseModal } from '../../modals/CaseModal';
import { ClientsList } from './ClientsList';
import { getClients } from '@/services/users/getClients';
import { SafeUser } from '@/types/SafeUser';
import { RegisterUserModal } from '../../modals/RegisterUserModal';
import { Button } from '../../ui/Button/Button';
import { RequestState } from '@/types/RequestState';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';

export default function ClientSearchSection() {
  const [requestState, setRequestState] = useState<RequestState | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [clients, setClients] = useState<WithId<SafeUser>[]>([]);
  const [registerUserModalIsOpen, setRegisterUserModalIsOpen] = useState(false);

  async function loadClients() {
    try {
      setRequestState({ status: 'loading' });
      const clientsPagination = await getClients({
        page,
        limit: 4,
        query,
      });

      const casesData = clientsPagination.data;
      setTotalPage(clientsPagination.meta.totalPages);

      setClients(casesData);
      setRequestState({ status: 'ok' });
    } catch (error: any) {
      console.log(error);
      setRequestState({ status: 'error', message: error.message });
      if (error instanceof UnauthorizedError) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    loadClients();
  }, [page, query]);

  return (
    <section className="flex flex-col items-center size-full">
      <RegisterUserModal isOpen={registerUserModalIsOpen} setIsOpen={setRegisterUserModalIsOpen} />
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <SearchBar setQuery={setQuery} />
        <div className="w-full min-lg:min-w-[200px]">
          <Button
            fontSize="1.2rem"
            paddingX="16px"
            width="auto"
            onclick={() => setRegisterUserModalIsOpen(true)}
          >
            Novo Cliente
          </Button>
        </div>
      </div>
      <ClientsList requestState={requestState} clients={clients} loadClients={loadClients} />
      <Pagination page={page} setPage={setPage} totalPage={totalPage} />
    </section>
  );
}
