type CanSubmit<T> = (form: T) => boolean | void;

export function createHandleSubmit<T>(
  onSubmit: (data: T) => void,
  canSubmit?: CanSubmit<T>
) {
  return (data: T) => {
    if (canSubmit && canSubmit(data) !== true) {
      return;
    }
    onSubmit(data);
  };
}
