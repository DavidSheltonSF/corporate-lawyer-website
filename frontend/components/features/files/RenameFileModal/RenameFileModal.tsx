import { Input } from '@/components/ui/Input/Input';
import { BaseModal } from '@/components/ui/Modal/BaseModal';
import { GlobalModalProps } from '@/types/GlobalModalProps';
import { useState } from 'react';

export interface RenameFileModalPayload {
  fileName: string;
  onConfirm: (newName: string) => void;
}

export function RenameFileModal({ payload, close }: GlobalModalProps<RenameFileModalPayload>) {
  const { fileName, onConfirm } = payload;
  const [inputText, setInputText] = useState(fileName);
  return (
    <BaseModal title="Renomear arquivo" onConfirm={() => onConfirm(inputText)} onClose={close}>
      <div className="flex w-[480px] p-[24px] ">
        <Input
          id="file-name"
          name="fileName"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
    </BaseModal>
  );
}
