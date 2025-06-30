"use client";

import {ReactNode, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/api/services/auth/useIsAuth";
import LoadingSpinner from "../layouts/Loading";

type LoginRoute = {
  children: ReactNode;
};

export default function LoginRoute({children}: LoginRoute) {
  const {data: user, isLoading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading)
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-[var(--light-yellow)] text-[var(--brown)]">
        <LoadingSpinner />
      </div>
    );

  return <>{children}</>;
}
