import React, {useEffect} from "react";
import Button from "@/ui/button";

interface FormularioWrapperProps<T> {
  values?: T;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isPending?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  children: React.ReactNode;
}

export function FormularioWrapper<T extends Record<string, unknown>>({
  onSubmit,
  isPending = false,
  isSuccess,
  isError,
  onSuccess,
  onError,
  children,
}: FormularioWrapperProps<T>) {
  useEffect(() => {
    if (isSuccess) onSuccess?.();
    if (isError) onError?.();
  }, [isSuccess, isError, onSuccess, onError]);

  const log = () => {
    console.log("clicado");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("form submit event!");
        onSubmit(e);
      }}
      className="text-[var(--brown)]"
    >
      {children}
      <Button
        intent="formulario"
        type="submit"
        className="mx-auto"
        onClick={log}
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
