import React from "react";
import Checkbox from "@/ui/checkbox";
import {BooleanFieldProps} from "@/types/fields";

const BooleanField: React.FC<BooleanFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="mb-1">{label}</h3>
      <div className="flex gap-3">
        <Checkbox
          displayName="Sim"
          intent="formulario"
          displayclassName="text-green-500"
          checked={value === true}
          onChange={() => onChange(true)}
        />
        <Checkbox
          displayName="Não"
          intent="formulario"
          displayclassName="text-red-500"
          checked={value === false}
          onChange={() => onChange(false)}
        />
      </div>
    </div>
  );
};
export default BooleanField;
