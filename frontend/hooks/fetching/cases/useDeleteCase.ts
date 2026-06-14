import { deleteCaseById } from '@/services/users/deleteCaseById';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCaseById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cases'],
      });
    },
  });
}
