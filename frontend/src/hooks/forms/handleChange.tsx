import {ChangeEvent, Dispatch, SetStateAction} from "react";

type InputOrTextAreaEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>;

export const createHandleChange = <T extends object>(
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  return (field: keyof T) => (e: InputOrTextAreaEvent) => {
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
