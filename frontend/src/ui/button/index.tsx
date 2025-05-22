import {cn} from "@/libs/cn";
import {cva, VariantProps} from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "uppercase py-2 px-8 flex justify-center items-center w-auto cursor-pointer hover:brightness-152",
  {
    variants: {
      intent: {
        first: "bg-[var(--yellow)] text-[var(--brown)]",
        second: "bg-[var(--brown)] text-[var(--yellow)]",
        third: "bg-[var(--light-yellow)] text-black",
        fourth: "bg-[var(--dark-yellow)] text-white",
        secondVar: "bg-[var(--brown)] text-white]",
      },
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, intent, children, ...props}, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({intent}), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
