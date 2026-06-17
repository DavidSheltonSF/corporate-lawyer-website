import { updateUser } from '@/services/users/updateUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      });
    },
  });
}
