import { Dispatch, SetStateAction, useState } from 'react';

interface UseFormReturn {
  formState: Record<string, string>;
  setFormState: Dispatch<SetStateAction<Record<string, string>>>;
  clearForm: () => void;
  updateField: (name: string, value: string) => void;
  hasEmptyFields: () => boolean;
}

export function useForm(formData: Record<string, string>): UseFormReturn {
  const [formState, setFormState] = useState(formData);

  function clearForm() {
    const aux: Record<string, string> = {};
    Object.keys(formState).forEach((key) => (aux[key] = ''));
    setFormState(aux);
  }

  function updateField(name: string, value: string) {
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function hasEmptyFields(): boolean {
    return Object.entries(formState).some(([, value]) => value.trim() === '');
  }

  return { formState, setFormState, clearForm, updateField, hasEmptyFields };
}
