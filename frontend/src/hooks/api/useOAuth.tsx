import {useState, useEffect} from "react";

export const useOAuth = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.data === "oauth-success") {
        setIsLoading(false);
        if (onSuccess) onSuccess();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSuccess]);

  const handleOAuth = () => {
    setIsLoading(true);

    const width = 600;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`,
      "Login com Google",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return {handleOAuth, isLoading};
};
