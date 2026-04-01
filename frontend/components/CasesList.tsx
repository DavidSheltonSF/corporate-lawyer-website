'use client';
import { CaseCard } from './CaseCard';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CaseCardSkeleton } from './CaseCardSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { CaseModal } from './modals/CaseModal';
import { CardOptionsModal } from './modals/CardOptionsModal';
import { UpdateCaseModal } from './modals/UpdateCaseModal';

interface Props {
  cases: WithId<CaseWithRelations>[];
  loading: boolean;
  loadCases: Function;
}

export function CasesList({ cases, loading, loadCases }: Props) {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [caseModalIsOpen, setCaseModalIsOpen] = useState(false);
  const [optionsModalIsOpen, setOptionsModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const renderCases = cases?.map((cas, index) => {
    return (
      <CaseCard
        openOptionsModal={() => {
          setOptionsModalIsOpen(true);
        }}
        setSelectedCaseId={setSelectedCaseId}
        openCaseModal={() => setCaseModalIsOpen(true)}
        key={index}
        caseData={cas}
      />
    );
  });

  const renderCaseSkeletons = Array.from({ length: 4 }).map((page, index) => {
    return <CaseCardSkeleton key={index} />;
  });

  function openUpdateModal() {
    setUpdateModalIsOpen(true);
  }
  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <CaseModal
        selectedCaseId={selectedCaseId}
        isOpen={caseModalIsOpen}
        setIsOpen={setCaseModalIsOpen}
      />
      <UpdateCaseModal
        loadCases={loadCases}
        selectedCaseId={selectedCaseId}
        isOpen={updateModalIsOpen}
        setIsOpen={setUpdateModalIsOpen}
      />
      <CardOptionsModal
        isOpen={optionsModalIsOpen}
        setIsOpen={setOptionsModalIsOpen}
        openUpdateModal={openUpdateModal}
        openDeleteModal={() => {}}
      />
      <Activity mode={!loading && (!cases || cases.length === 0) ? 'visible' : 'hidden'}>
        <h1 className="text-3xl">Nenhum caso encontrado</h1>
      </Activity>
      {loading ? renderCaseSkeletons : renderCases}
    </div>
  );
}
