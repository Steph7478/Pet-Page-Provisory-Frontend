import React from "react";
import Input from "@/ui/input";
import {FormFieldPropsAdopt} from "@/types/fields";

const FormField = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  rows,
  placeholder,
}: FormFieldPropsAdopt) => {
  return (
    <label className="flex flex-col mb-4">
      <span className="mb-1">{label}</span>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          required={required}
          rows={rows ?? 4}
          className="border border-[var(--brown)] rounded p-2 resize-none hover:brightness-125 focus:outline-none"
          value={value ?? ""}
          onChange={onChange}
        />
      ) : (
        <Input
          intent="formulario"
          placeholder={placeholder}
          type={type}
          required={required}
          value={value ?? ""}
          onChange={onChange}
        />
      )}
    </label>
  );
};

export default FormField;
