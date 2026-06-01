import { Dispatch, SetStateAction, useState } from 'react';

type FormState<T> = {
  [K in keyof T]: string;
};

interface UseFormReturn<T> {
  formState: FormState<T>;
  setFormState: Dispatch<SetStateAction<FormState<T>>>;
  clearForm: () => void;
  updateField: (name: keyof T, value: string) => void;
  hasEmptyFields: () => boolean;
}

export function useForm<T>(formData: FormState<T>): UseFormReturn<T> {
  const [formState, setFormState] = useState(formData);

  function clearForm() {
    const aux = { ...formState };
    (Object.keys(formState) as Array<keyof T>).forEach((key) => (aux[key] = ''));
    setFormState(aux);
  }

  function updateField(name: keyof T, value: string) {
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function hasEmptyFields(): boolean {
    return (Object.values(formState) as string[]).some((value) => !value || value.trim() === '');
  }

  return { formState, setFormState, clearForm, updateField, hasEmptyFields };
}
