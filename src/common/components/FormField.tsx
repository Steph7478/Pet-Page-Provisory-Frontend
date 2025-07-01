import React from "react";
import Input from "@/ui/input";
import {FormFieldPropsAdopt} from "@/types/fields";

const FormField = ({
  label,
  type = "text",
  required = false,
  rows,
  placeholder,
  error,
  ...inputProps
}: FormFieldPropsAdopt) => {
  return (
    <label className="flex flex-col">
      <span className="mb-1">{label}</span>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          required={required}
          rows={rows ?? 4}
          className={`border border-[var(--brown)] rounded p-2 resize-none hover:brightness-125 focus:outline-none ${
            error ? "border-red-600" : ""
          }`}
          {...inputProps}
        />
      ) : (
        <Input
          intent="formulario"
          placeholder={placeholder}
          type={type}
          required={required}
          className={error ? "border-red-600" : ""}
          {...inputProps}
        />
      )}
    </label>
  );
};

export default FormField;
