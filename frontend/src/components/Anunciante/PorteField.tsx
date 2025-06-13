import {PorteFieldProps} from "@/types/fields";
import Checkbox from "@/ui/checkbox";
export function PorteField<T, K extends keyof T>({
  form,
  setFieldValue,
  field,
}: PorteFieldProps<T, K>) {
  const options = ["Pequeno", "Médio", "Grande"] as const;

  return (
    <div className="flex flex-col justify-center items-center">
      <h3>Porte do animal</h3>
      <div className="flex gap-3">
        {options.map((option) => (
          <Checkbox
            key={option}
            intent="formulario"
            displayclassName="text-[var(--dark-yellow)]"
            displayName={option}
            checked={form[field] === option}
            onChange={() => setFieldValue(field, option as T[K])}
          />
        ))}
      </div>
    </div>
  );
}
