import {FormEvent} from "react";

type CanSubmit<T> = (form: T) => boolean | void;

export function createHandleSubmit<T>(
  formData: T,
  onSubmit: (data: T) => void,
  canSubmit?: CanSubmit<T>
) {
  return (e: FormEvent) => {
    e.preventDefault();

    if (canSubmit && canSubmit(formData) !== true) {
      return;
    }

    onSubmit(formData);
  };
}
