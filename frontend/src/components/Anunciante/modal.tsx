import {useFormulario} from "@/hooks/api/useFormulario";
import {createHandleChange} from "@/hooks/forms/handleChange";
import {createHandleSubmit} from "@/hooks/forms/handleSubmit";
import Button from "@/ui/button";
import {toast} from "@/ui/CustomToaster";
import Input from "@/ui/input";
import React, {useEffect, useState} from "react";
import {IoClose} from "react-icons/io5";
import {Formulário} from "@/types/formulario";
import {PetInfos} from "@/types/pet";

const Modal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {mutate, isPending, isSuccess, isError} = useFormulario();

  const [form, useForm] = useState<Partial<PetInfos>>({
    nome: "",
    raca: "",
    porte: "",
    idade: 0,
    descricao: "",
    localizacao: "",
    fotoUrl: "",
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

  return (
    <>
      <div className="fixed inset-0  bg-black/75 flex justify-center z-50 items-center"></div>
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
          <div className="overflow-y-auto scroll-formulario bg-[var(--light-yellow)] border-[16px] border-[var(--brown)] text-[var(--brown)] rounded-lg p-6 flex flex-col gap-4 w-full max-w-[600px] h-full relative">
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
                <div className="gap-3 flex flex-wrap">
                  {label("Nome", "text", "Nome do animal", "nome")}
                  {label("Raca", "text", "Raca do animal", "raca")}
                  {label("Idade", "text", "Idade do animal", "idade")}
                  {label(
                    "Localizacao",
                    "text",
                    "Localizacao do animal",
                    "localizacao"
                  )}
                  {label("Url da foto", "text", "Foto do animal", "fotoUrl")}
                  {label(
                    "Descricao",
                    "textarea",
                    "Descricao do animal",
                    "descricao"
                  )}
                </div>
              </div>
              <Button intent="formulario" type="submit" disabled={isPending}>
                {isPending ? "Registrando..." : "Registrar"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
