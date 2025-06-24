export interface PorteFieldProps<T, K extends keyof T> {
  label?: string;
  value: T[K];
  onChange: (value: T[K]) => void;
  options?: readonly T[K][];
}

export type BooleanFieldProps = {
  label: string;
  value?: boolean | undefined;
  onChange: (val: boolean) => void;
};

export interface FormFieldPropsAdopt {
  label: string;
  type?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  error?: string;
}

export type InputType = "text" | "number" | "email" | "tel" | "textarea";

export interface FieldConfigRegister<T> {
  label: string;
  field: keyof T;
  type: InputType;
  placeholder?: string;
}
