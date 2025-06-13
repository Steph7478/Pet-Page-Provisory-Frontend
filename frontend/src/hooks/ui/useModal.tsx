import React, {useEffect, useState} from "react";
import {createHandleChange, setFieldValue} from "@/hooks/forms/handleChange";
import {createHandleSubmit} from "@/hooks/forms/handleSubmit";
import Button from "@/ui/button";
import {FormularioWrapperProps, Handlers} from "@/types/fields";

export function FormularioWrapper<T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
  isPending = false,
  isSuccess,
  isError,
  onSuccess,
  onError,
  children,
}: FormularioWrapperProps<T>) {
  const [form, setForm] = useState<T>(initialValues);

  useEffect(() => {
    if (isSuccess) onSuccess?.();
    if (isError) onError?.();
  }, [isSuccess, isError, onSuccess, onError]);

  const handleChange = createHandleChange(setForm);
  const handleSubmit = createHandleSubmit(form, onSubmit);

  const handlers: Handlers<T> = {
    handleChange,
    setFieldValue: (field, value) => setFieldValue(setForm, field, value),
  };

  return (
    <form onSubmit={handleSubmit} className="text-[var(--brown)]">
      {children(form, handlers)}
      <Button
        intent="formulario"
        type="submit"
        className="mx-auto"
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
