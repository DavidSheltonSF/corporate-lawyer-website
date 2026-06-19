import { uploadCaseFile } from "@/services/cases/uploadCaseFile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadCaseFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['files']
      })
    }
  });
}