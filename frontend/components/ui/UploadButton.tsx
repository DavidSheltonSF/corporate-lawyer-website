import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import { Button } from './Button/Button';
import { ButtonVariant } from './Button/ButtonVariant';
import { UploadFileState } from '@/types/UploadFileState';

interface Props {
  setUploadFileState: Dispatch<SetStateAction<UploadFileState>>;
}

export function UploadButton({ setUploadFileState }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleOpenFilePicker() {
    inputRef.current?.click();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    const selectedFile = selectedFiles[0];

    const MAX_FILE_SIZE = 9 * 1024 * 1024;

    if (selectedFile.size > MAX_FILE_SIZE) {
      return setUploadFileState({
        status: 'error',
        message: 'Arquivo ultrapassa o tamanho máximo de 9 MB.',
      });
    }

    setUploadFileState({ status: 'ok', file: selectedFile });
  }

  return (
    <div className="flex size-full">
      <input
        name="file"
        accept=".pdf, .jpeg, .jpg, .png"
        onChange={handleChange}
        ref={inputRef}
        className="hidden"
        type="file"
      />
      <Button
        onClick={handleOpenFilePicker}
        variant={ButtonVariant.SECONDARY}
        className="w-full py-[4px]"
      >
        Selecionar arquivo
      </Button>
    </div>
  );
}
