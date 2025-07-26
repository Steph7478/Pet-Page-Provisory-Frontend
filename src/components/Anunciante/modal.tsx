import React, {useState} from "react";
import {useRegisterPet} from "@/api/services/pet/useRegisterPet";
import {FormularioWrapper} from "@/hooks/components/useModal";
import {toast} from "@/ui/CustomToaster";
import {IoClose} from "react-icons/io5";
import {PorteField} from "./PorteField";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PetFormSchema, petSchema} from "@/schemas/pet";
import FormField from "@/common/components/FormField";
import {FieldConfigRegister} from "@/types/fields";
import {useAuth} from "@/api/services/auth/useIsAuth";

const Modal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {mutate, isPending, isSuccess, isError} = useRegisterPet();
  const {data: authData, isLoading: authLoading} = useAuth();

  if (authLoading) {
    return (
      <div className="fixed inset-0 bg-black/75 z-50 flex justify-center items-center text-white">
        Carregando...
      </div>
    );
  }

  const clientId = authData?.id;
  if (!clientId) {
    return (
      <div className="fixed inset-0 bg-black/75 z-50 flex justify-center items-center text-white">
        Usuário não autenticado.
      </div>
    );
  }

  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<PetFormSchema>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      ownerId: clientId,
      nome: "",
      raca: "",
      porte: "Pequeno",
      idade: 0,
      descricao: "",
      localizacao: "",
      fotoUrl: "",
    },
  });

  const onSubmit = (data: PetFormSchema) => {
    if (!fotoFile) {
      toast.error("Por favor, selecione uma foto.");
      return;
    }

    const formData = new FormData();

    formData.append("ownerId", data.ownerId);
    formData.append("nome", data.nome);
    formData.append("raca", data.raca);
    formData.append("porte", data.porte);
    formData.append("idade", String(data.idade));
    formData.append("descricao", data.descricao);
    formData.append("localizacao", data.localizacao);
    formData.append("fotoUrl", fotoFile);

    mutate(formData, {
      onSuccess: () => {
        toast.success("Pet registrado com sucesso!");
        setIsOpen(false);
      },
      onError: () => {
        toast.error("Erro ao registrar pet.");
      },
    });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione um arquivo de imagem válido.");
      return;
    }

    setFotoFile(file);
    setValue("fotoUrl", "");
  };

  const fields: FieldConfigRegister<PetFormSchema>[] = [
    {label: "Nome", field: "nome", type: "text", placeholder: "Nome do pet"},
    {label: "Raça", field: "raca", type: "text", placeholder: "Raça do pet"},
    {
      label: "Idade",
      field: "idade",
      type: "number",
      placeholder: "Idade do pet",
    },
    {
      label: "Descrição",
      field: "descricao",
      type: "textarea",
      placeholder: "Descrição",
    },
    {
      label: "Localização",
      field: "localizacao",
      type: "text",
      placeholder: "Localização",
    },
    {
      label: "Foto (URL)",
      field: "fotoUrl",
      type: "text",
      placeholder: "URL da foto",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex justify-center items-center">
      <div
        className="fixed inset-0"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[var(--light-yellow)] border-[16px] border-[var(--brown)] rounded-lg p-6 scroll-formulario max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col gap-4 z-50"
        role="dialog"
        aria-modal="true"
      >
        <IoClose
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 cursor-pointer text-[var(--brown)] hover:brightness-125"
          size={28}
        />
        <h2 className="text-xl text-[var(--brown)] font-semibold mb-2">
          Cadastrar Pet
        </h2>

        <FormularioWrapper
          onSubmit={handleSubmit(onSubmit)}
          isPending={isPending}
          isSuccess={isSuccess}
          isError={isError}
          onSuccess={() => {
            toast.success("Pet cadastrado com sucesso!");
            setIsOpen(false);
          }}
          onError={() => toast.error("Falha ao cadastrar pet")}
        >
          <div className="flex flex-col gap-4">
            {fields.map(({label, field, type, placeholder}) => (
              <FormField
                key={String(field)}
                label={label}
                type={type}
                placeholder={placeholder}
                {...register(
                  field,
                  field === "idade" ? {valueAsNumber: true} : {}
                )}
                error={errors[field]?.message}
              />
            ))}

            <PorteField<PetFormSchema, "porte">
              value={watch("porte")}
              onChange={(val) => setValue("porte", val, {shouldValidate: true})}
            />

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[var(--brown)] cursor-pointer">
                Upload de foto (arquivo)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="cursor-pointer"
              />
              {fotoFile && (
                <span className="text-sm text-gray-600">
                  Arquivo selecionado: {fotoFile.name}
                </span>
              )}
            </div>
          </div>
        </FormularioWrapper>
      </div>
    </div>
  );
};

export default Modal;
