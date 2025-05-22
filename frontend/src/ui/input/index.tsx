import {cn} from "@/libs/cn";
import {cva, VariantProps} from "class-variance-authority";
import React from "react";

const inputVariants = cva(
  "rounded-full hover:brightness-125 focus:outline-none  min-w-[150px] px-8 py-4",
  {
    variants: {
      intent: {
        first: "focus:bg-[var(--brown)]/75 bg-[var(--brown)]/60",
      },
    },
  }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, intent, ...props}, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({intent}), className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
