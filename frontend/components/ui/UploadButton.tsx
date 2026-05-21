import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import { Button } from './Button/Button';
import { ButtonVariant } from './Button/ButtonVariant';

interface Props {
  setFile: Dispatch<SetStateAction<File | null>>;
}

export function UploadButton({ setFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleOpenFilePicker() {
    inputRef.current?.click();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    const selectedFile = selectedFiles[0];
    setFile(selectedFile);
  }

  return (
    <div className="flex size-full">
      <input name="file" onChange={handleChange} ref={inputRef} className="hidden" type="file" />
      <Button onClick={handleOpenFilePicker} variant={ButtonVariant.SECONDARY} className="w-full py-[4px]">
        Selecionar arquivo
      </Button>
    </div>
  );
}
