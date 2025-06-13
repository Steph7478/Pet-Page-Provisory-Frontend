export type Handlers<T> = {
  handleChange: (
    field: keyof T
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
};

export type FormularioWrapperProps<T> = {
  initialValues: T;
  onSubmit: (data: T) => void;
  isPending?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  children: (form: T, handlers: Handlers<T>) => React.ReactNode;
};

export type PorteFieldProps<T, K extends keyof T> = {
  form: T;
  setFieldValue: (field: K, value: T[K]) => void;
  field: K;
};

export type FieldConfig<T> = {
  label: string;
  field: keyof T;
  type: "text" | "email" | "number" | "textarea";
  placeholder: string;
};

export type FormFieldsProps<T> = {
  form: T;
  handleChange: (
    field: keyof T
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fields: FieldConfig<T>[];
};

export type FieldConfigRegister<T> = {
  label: string;
  field: keyof T;
  type: "text" | "number" | "textarea";
  placeholder: string;
};

export type BooleanFieldProps = {
  label: string;
  value?: string | boolean | null | undefined;
  onChange: (val: boolean) => void;
};

export type FormFieldPropsAdopt = {
  label: string;
  value: string | number | null | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  rows?: number;
  placeholder?: string;
};
