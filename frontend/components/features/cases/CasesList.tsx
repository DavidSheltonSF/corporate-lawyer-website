'use client';
import { CaseCard } from './CaseCard/CaseCard';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CardSkeleton } from '../../ui/Card/CardSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { CardActionsModal } from '../actions/CardActionsModal';
import { UpdateCaseModal } from '../../modals/UpdateCaseModal';
import { DeleteCaseModal } from '../../modals/DeleteCaseModal';
import { useCaseModalContext } from '@/hooks/useCaseModalContext';
import { useSelectedCaseContext } from '@/hooks/useSelectedCaseContext';

interface Props {
  cases: WithId<CaseWithRelations>[];
  loading: boolean;
  loadCases: Function;
}

export function CasesList({ cases, loading, loadCases }: Props) {
  const [optionsModalIsOpen, setOptionsModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const setCaseModalIsOpen = useCaseModalContext().setIsOpen;
  const { selectedCaseId, setSelectedCaseId } = useSelectedCaseContext();
  const renderCases = cases?.map((cas, index) => {
    return (
      <CaseCard
        key={index}
        openOptionsModal={() => {
          setOptionsModalIsOpen(true);
          setSelectedCaseId(cas.id);
        }}
        openCaseModal={() => {
          setCaseModalIsOpen(true);
          setSelectedCaseId(cas.id);
        }}
        caseData={cas}
      />
    );
  });

  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CardSkeleton key={index} />;
  });

  function openUpdateModal() {
    setUpdateModalIsOpen(true);
  }

  function openDeleteModal() {
    setDeleteModalIsOpen(true);
  }

  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <UpdateCaseModal
        loadCases={loadCases}
        selectedCaseId={selectedCaseId}
        isOpen={updateModalIsOpen}
        setIsOpen={setUpdateModalIsOpen}
      />
      <DeleteCaseModal
        selectedCaseId={selectedCaseId}
        loadCases={loadCases}
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
      />
      <CardActionsModal
        isOpen={optionsModalIsOpen}
        setIsOpen={setOptionsModalIsOpen}
        openUpdateModal={openUpdateModal}
        openDeleteModal={openDeleteModal}
      />

      <Activity mode={!loading && (!cases || cases.length === 0) ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">Nenhum caso encontrado</h1>
      </Activity>
      {loading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
