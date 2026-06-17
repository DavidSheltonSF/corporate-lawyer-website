import { deleteUser } from '@/services/users/deleteUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      });
    },
  });
}
