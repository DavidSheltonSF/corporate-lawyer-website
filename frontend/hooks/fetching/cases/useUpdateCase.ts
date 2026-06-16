import { updateCaseById } from '@/services/cases/updateCaseById';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCaseById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cases'],
      });
    },
  });
}
