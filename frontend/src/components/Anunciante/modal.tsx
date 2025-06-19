import {useRegisterPet} from "@/hooks/api/pet/useRegisterPet";
import {FormularioWrapper} from "@/hooks/ui/useModal";
import {PetInfos} from "@/types/pet";
import {toast} from "@/ui/CustomToaster";
import {IoClose} from "react-icons/io5";
import {PorteField} from "./PorteField";
import {FormFields} from "./FormField";
import {FieldConfigRegister} from "@/types/fields";

const Modal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {mutate, isPending, isSuccess, isError} = useRegisterPet();

  const initialValues: Partial<PetInfos> = {
    nome: "",
    raca: "",
    porte: "",
    idade: 0,
    descricao: "",
    localizacao: "",
    fotoUrl: "",
  };

  const fields: FieldConfigRegister<Partial<PetInfos>>[] = [
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
    <>
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
            initialValues={initialValues}
            onSubmit={(data) => mutate(data as PetInfos)}
            isPending={isPending}
            isSuccess={isSuccess}
            isError={isError}
            onSuccess={() => {
              toast.success("Pet cadastrado com sucesso!");
              setIsOpen(false);
            }}
            onError={() => toast.error("Falha ao cadastrar pet")}
          >
            {(form, {handleChange, setFieldValue}) => (
              <div className="flex flex-col gap-4">
                <FormFields
                  form={form}
                  handleChange={handleChange}
                  fields={fields}
                />
                <PorteField
                  form={form}
                  setFieldValue={setFieldValue}
                  field="porte"
                />
              </div>
            )}
          </FormularioWrapper>
        </div>
      </div>
    </>
  );
};

export default Modal;
