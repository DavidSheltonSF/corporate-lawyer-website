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
import { useDeleteClient } from '@/hooks/fetching/users/useDeleteClient';
import { useErrorModal } from '@/hooks/modals/useErrorModal';
import { useSuccessModal } from '@/hooks/modals/useSuccessModal';
import { useUpdateClient } from '@/hooks/fetching/users/useUpdateClient';
import { ButtonWithLoadingEffect } from '@/components/ui/ButtonWithLoadingEffect';

export default function ClientSearch() {
  const { search, setSearch } = useClientFilters();
  const [searchText, setSearchText] = useState(search);
  const [page, setPage] = useState(1);
  const [registerUserModalIsOpen, setRegisterUserModalIsOpen] = useState(false);

  const { openUpdateClientModal } = useUpdateClientModal();
  const { openDeleteClientModal } = useDeleteClientModal();
  const { openErrorModal } = useErrorModal();
  const { openSuccessModal } = useSuccessModal();

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useClients({
    search,
    page,
    limit: 4,
  });
  const deleteClientMutation = useDeleteClient();
  const updateClientMutation = useUpdateClient();

  if (error) {
    console.log(error);
    return null;
  }

  async function handleUpdate(clientId: string, data: Record<string, string>) {
    try {
      await updateClientMutation.mutateAsync({ userId: clientId, data });
      openSuccessModal('Cliente atualizado com sucesso!');
    } catch (error: any) {
      openErrorModal(error.message);
    }
  }

  function handleOpenUpdateModal(clientId: string) {
    openUpdateClientModal(clientId, handleUpdate);
  }

  async function handleDelete(clientId: string) {
    try {
      await deleteClientMutation.mutateAsync(clientId);
      openSuccessModal('Cliente removido com sucesso!');
    } catch (error: any) {
      openErrorModal(error.message);
    }
  }

  function handleOpenDeleteModal(clientSlice: WithId<UserSlice>) {
    const { id, firstName, lastName } = clientSlice;
    openDeleteClientModal({ id, firstName, lastName }, handleDelete);
  }

  console.log(data?.pages);

  return (
    <section className="flex flex-col w-full gap-[40px] md:w-[720px]">
      <RegisterClientModal
        isOpen={registerUserModalIsOpen}
        setIsOpen={setRegisterUserModalIsOpen}
      />
      <div className="flex flex-col gap-[40px] size-full">
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
          clients={data?.pages.flatMap((page) => page.items) || []}
          openDeleteModal={handleOpenDeleteModal}
          openUpdateModal={handleOpenUpdateModal}
          fetchClients={() => {}}
        />
      )}
      {hasNextPage && (
        <ButtonWithLoadingEffect
          className="py-[8px] text-[16px]"
          label="Carregar Mais"
          loadingLabel="Carregando"
          isLoading={isLoading || isFetchingNextPage}
          onClick={() => {
            fetchNextPage();
          }}
        />
      )}
    </section>
  );
}
