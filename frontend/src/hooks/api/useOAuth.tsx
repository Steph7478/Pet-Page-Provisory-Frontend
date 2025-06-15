import {oAuth} from "@/services/api/auth/oAuth";
import {useMutation} from "@tanstack/react-query";

export const useOAuth = () => {
  return useMutation({
    mutationFn: oAuth,
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url;
      }
    },
  });
};
