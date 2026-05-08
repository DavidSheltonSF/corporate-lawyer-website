'use client';
import { CaseCard } from './CaseCard';
import { WithId } from '@/types/WithId';
import { Activity, useState } from 'react';
import { CaseCardSkeleton } from './CaseCardSkeleton';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { CaseModal } from './modals/CaseModal';
import { CardOptionsModal } from './modals/CardOptionsModal';
import { UpdateCaseModal } from './modals/UpdateCaseModal';
import { DeleteCaseModal } from './modals/DeleteCaseModal';
import { CaseFilesUploadModal } from './modals/CaseFilesUploadModal';

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
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
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
    return <CaseCardSkeleton key={index} />;
  });

  function openUpdateModal() {
    setUpdateModalIsOpen(true);
  }

  function openDeleteModal() {
    setDeleteModalIsOpen(true);
  }

  return (
    <div className="flex flex-col gap-[32px] mt-[88px] w-full">
      <CaseFilesUploadModal
        isOpen={uploadModalIsOpen}
        close={() => {
          setUploadModalIsOpen(false);
          setCaseModalIsOpen(true);
        }}
        caseId={selectedCaseId || ''}
      />
      <CaseModal
        openUploadModal={() => {
          setUploadModalIsOpen(true);
          setCaseModalIsOpen(false);
        }}
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
      <DeleteCaseModal
        selectedCaseId={selectedCaseId}
        loadCases={loadCases}
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
      />
      <CardOptionsModal
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
