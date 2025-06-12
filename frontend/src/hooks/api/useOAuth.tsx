import {oAuth} from "@/services/api/auth/oAuth";
import {useMutation} from "@tanstack/react-query";

export const useOAuth = () => {
  return useMutation({
    mutationFn: oAuth,
    onSuccess: (data) => {
      if (data?.url) {
        const width = 600;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        window.open(
          data.url,
          "Login com Google",
          `width=${width},height=${height},top=${top},left=${left}`
        );
      }
    },
  });
};
