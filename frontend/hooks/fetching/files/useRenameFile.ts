import { renameFile } from '@/services/files/renameFile';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRenameFile() {
  const queryClint = useQueryClient();
  return useMutation({
    mutationFn: renameFile,
    onSuccess: () => {
      queryClint.invalidateQueries({
        queryKey: ['files'],
      });
    },
  });
}
