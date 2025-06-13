import {FormFieldsProps} from "@/types/fields";
import Input from "@/ui/input";

export function FormFields<T>({
  form,
  handleChange,
  fields,
}: FormFieldsProps<T>) {
  return (
    <>
      {fields.map(({label, field, type, placeholder}) => (
        <label key={String(field)} className="flex flex-col">
          <span className="mb-1">{label}</span>
          {type === "textarea" ? (
            <textarea
              placeholder={placeholder}
              required
              className="border border-[var(--brown)] rounded p-2 resize-none hover:brightness-125 focus:outline-none"
              rows={4}
              value={form[field] != null ? String(form[field]) : ""}
              onChange={handleChange(field)}
            />
          ) : (
            <Input
              intent="formulario"
              placeholder={placeholder}
              type={type}
              required
              value={form[field] != null ? String(form[field]) : ""}
              onChange={handleChange(field)}
            />
          )}
        </label>
      ))}
    </>
  );
}
