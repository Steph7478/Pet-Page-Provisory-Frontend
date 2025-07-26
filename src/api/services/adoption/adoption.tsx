import {
  approveAdoption,
  rejectAdoption,
  cancelAdoption,
} from "@/api/mutations/adoption/adoption";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useAllowAdoption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["pets"]});
      queryClient.invalidateQueries({queryKey: ["formulario"]});
    },
  });
};

export const useDenyAdoption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["pets"]});
      queryClient.invalidateQueries({queryKey: ["formulario"]});
    },
  });
};

export const useCancelAdoption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["pets"]});
      queryClient.invalidateQueries({queryKey: ["formulario"]});
    },
  });
};
