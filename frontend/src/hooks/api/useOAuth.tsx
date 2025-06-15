import {useState} from "react";

export const useOAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuth = () => {
    setIsLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
  };

  return {handleOAuth, isLoading};
};
