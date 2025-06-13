import {ChangeEvent} from "react";

export const createHandleChange = <T extends object>(
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  return (field: keyof T) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState((prev) => ({
        ...prev,
        [field]: e.target.value as unknown as T[keyof T],
      }));
    };
};

export const setFieldValue = <T extends object, K extends keyof T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  field: K,
  value: T[K]
) => {
  setState((prev) => ({
    ...prev,
    [field]: value,
  }));
};
