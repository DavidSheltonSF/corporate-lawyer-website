'use client';
import { useState } from 'react';
import { SearchBar } from '../../ui/Search/SearchBar';
import { WithId } from '@/types/WithId';
import { Pagination } from '../../Pagination';
import { ClientsList } from './ClientsList';
import { RegisterClientModal } from '../../modals/RegisterClientModal';
import { Button } from '../../ui/Button/Button';
import { useClientFilters } from '@/hooks/url/useClientFilters';
import { useUpdateClientModal } from '@/hooks/modals/useUpdateClientModal';
import { useDeleteClientModal } from '@/hooks/modals/useDeleteClientModal';
import { UserSlice } from '@/types/UserSlice';
import { useClients } from '@/hooks/fetching/users/useClients';

export default function ClientSearch() {
  const { search, setSearch } = useClientFilters();
  const [searchText, setSearchText] = useState(search);
  const [page, setPage] = useState(1);
  const [registerUserModalIsOpen, setRegisterUserModalIsOpen] = useState(false);

  const { openUpdateClientModal } = useUpdateClientModal();
  const { openDeleteClientModal } = useDeleteClientModal();

  const { data, isLoading, error } = useClients({ search, page, limit: 4 });

  if (error || !data) {
    console.log(error);
    return null;
  }

  function handleUpdate(clientId: string) {
    openUpdateClientModal(clientId, () => {});
  }

  function handleDelete(clientSlice: WithId<UserSlice>) {
    const { id, firstName, lastName } = clientSlice;
    openDeleteClientModal({ id, firstName, lastName }, () => {});
  }

  return (
    <section className="flex flex-col items-center size-full">
      <RegisterClientModal
        isOpen={registerUserModalIsOpen}
        setIsOpen={setRegisterUserModalIsOpen}
      />
      <div className="flex flex-col lg:flex-row gap-[40px] size-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(searchText);
          }}
        >
          <SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </form>
        <div className="w-full min-lg:min-w-[200px]">
          <Button
            className="p-[16px] bg-color-white text-color-black w-full min-lg:w-fit"
            onClick={() => setRegisterUserModalIsOpen(true)}
          >
            Novo Cliente
          </Button>
        </div>
      </div>
      {isLoading ? (
        <ClientsList.Skeleton />
      ) : (
        <ClientsList
          clients={data?.items}
          openDeleteModal={handleDelete}
          openUpdateModal={handleUpdate}
          fetchClients={() => {}}
        />
      )}
      <Pagination page={page} setPage={setPage} totalPage={data?.meta.totalPages} />
    </section>
  );
}
