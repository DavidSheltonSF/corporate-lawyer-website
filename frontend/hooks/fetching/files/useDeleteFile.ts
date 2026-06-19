import { deleteFile } from '@/services/files/deleteFile';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['files'],
      });
    },
  });
}
