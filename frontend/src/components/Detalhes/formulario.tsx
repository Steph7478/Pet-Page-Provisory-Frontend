import {useFormulario} from "@/hooks/api/useFormulario";
import {createHandleChange, setFieldValue} from "@/hooks/forms/handleChange";
import {createHandleSubmit} from "@/hooks/forms/handleSubmit";
import Button from "@/ui/button";
import Checkbox from "@/ui/checkbox";
import {toast} from "@/ui/CustomToaster";
import Input from "@/ui/input";
import React, {useEffect, useState} from "react";
import {IoClose} from "react-icons/io5";
import {Formulário} from "@/types/formulario";

const Modal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {mutate, isPending, isSuccess, isError} = useFormulario();

  const [form, useForm] = useState<Partial<Formulário>>({
    email: "",
    telefone: null,
    motivo: "",
    ambiente: "",
    espacoExterno: undefined,
    teveAnimaisAntes: undefined,
    ambienteSeguro: undefined,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Formulário enviado");
      setIsOpen(false);
    }
    if (isError) {
      toast.error("Falha ao enviar formulário");
    }
  }, [isSuccess, isError, setIsOpen]);

  const handleChange = createHandleChange(useForm);

  const handleSubmit = createHandleSubmit(form, (data) =>
    mutate(data as Formulário)
  );

  const label = (
    text: string,
    type: string,
    placeholder: string,
    field: keyof typeof form
  ) => (
    <label className="flex flex-col">
      <span className="mb-1">{text}</span>
      {type === "email" || type === "tel" || type === "text" ? (
        <Input
          intent="formulario"
          placeholder={placeholder}
          type={type}
          required
          value={typeof form[field] === "string" ? form[field] : ""}
          onChange={handleChange(field)}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          required
          className="border border-[var(--brown)] rounded p-2 resize-none hover:brightness-125 focus:outline-none"
          rows={4}
          value={typeof form[field] === "string" ? form[field] : ""}
          onChange={handleChange(field)}
        />
      )}
    </label>
  );

  const radioCheck = (
    title: string,
    field: keyof typeof form,
    options: string[]
  ) => (
    <div className="flex flex-col justify-center items-center">
      <h3>{title}</h3>
      <div className="flex gap-3">
        {options.map((option) => (
          <Checkbox
            intent={"formulario"}
            key={option}
            displayclassName="text-[var(--dark-yellow)]"
            displayName={option}
            checked={form[field] === option}
            onChange={() => setFieldValue(useForm, field, option)}
          />
        ))}
      </div>
    </div>
  );

  const checkout = (title: string, field: keyof typeof form) => (
    <div className="flex flex-col justify-center items-center">
      <h3>{title}</h3>
      <div className="flex gap-3">
        <Checkbox
          displayName="Sim"
          intent={"formulario"}
          displayclassName="text-green-500"
          checked={form[field] === true}
          onChange={() => setFieldValue(useForm, field, true)}
        />
        <Checkbox
          displayName="Não"
          displayclassName="text-red-500"
          intent={"formulario"}
          checked={form[field] === false}
          onChange={() => setFieldValue(useForm, field, false)}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/75 flex justify-center z-50 items-center"></div>
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center z-50 justify-center"
        role="dialog"
        aria-modal="true"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex justify-center items-center max-[550px]:h-full"
        >
          <div className="overflow-y-auto scroll-formulario bg-[var(--light-yellow)] border-[16px] border-[var(--brown)] rounded-lg p-6 flex flex-col gap-4 w-full h-full relative">
            <IoClose
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer right-0 text-[var(--brown)] hover:brightness-125 m-2 top-0"
              size={28}
            />
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Formulário</h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col max-[550px]:text-center"
            >
              <div className="flex justify-between max-[550px]:flex-col max-[550px]:items-center items-start max-[550px]:mb-10 mb-4 gap-10 min-[550px]:max-w-[95%]">
                <div className="gap-3 flex flex-col">
                  {label("Email", "email", "seu email", "email")}
                  {label("Telefone", "tel", "seu telefone", "telefone")}
                  {label(
                    "Motivo da adoção",
                    "textarea",
                    "Descreva aqui",
                    "motivo"
                  )}
                </div>
                <div className="justify-center items-center flex flex-col text-center gap-6">
                  {radioCheck("Sobre o ambiente", "ambiente", [
                    "Apartamento",
                    "Casa",
                  ])}
                  {checkout("Sua casa tem espaço externo?", "espacoExterno")}
                  {checkout(
                    "O ambiente é fechado/seguro para o animal?",
                    "ambienteSeguro"
                  )}
                  {checkout("Você já teve animais antes?", "teveAnimaisAntes")}
                </div>
              </div>
              <Button intent="formulario" type="submit" disabled={isPending}>
                {isPending ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
