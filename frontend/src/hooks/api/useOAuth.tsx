import {useState} from "react";

export const useOAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

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
