"use client";

import {useAuth} from "@/api/services/auth/useIsAuth";

export default function AuthSwitch({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const {data: user} = useAuth();
  return user ? <>{children}</> : <>{fallback}</>;
}
