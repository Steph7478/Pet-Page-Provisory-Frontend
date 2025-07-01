import {PorteFieldProps} from "@/types/fields";
import Checkbox from "@/ui/checkbox";

export function PorteField<T, K extends keyof T>({
  value,
  onChange,
  options = ["Pequeno", "Médio", "Grande"] as unknown as readonly T[K][],
}: PorteFieldProps<T, K>) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h3>Porte do animal</h3>
      <div className="flex gap-3">
        {options.map((option) => (
          <Checkbox
            key={String(option)}
            intent="formulario"
            displayclassName="text-[var(--dark-yellow)]"
            displayName={String(option)}
            checked={value === option}
            onChange={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  );
}
