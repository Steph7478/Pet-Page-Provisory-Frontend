import {cn} from "@/libs/cn";
import {cva, VariantProps} from "class-variance-authority";
import {motion} from "framer-motion";
import React from "react";

const buttonVariants = cva(
  "uppercase py-2 px-8 flex justify-center transition-colors duration-200 ease-in-out items-center w-auto disabled:opacity-75 cursor-pointer hover:brightness-150",
  {
    variants: {
      intent: {
        first: "bg-[var(--yellow)] text-[var(--brown)]",
        second: "bg-[var(--brown)] text-[var(--yellow)]",
        third: "bg-[var(--light-yellow)] text-black",
        fourth: "bg-[var(--dark-yellow)]  hover:brightness-110 text-white",
        secondVar: "bg-[var(--brown)] text-white]",
        formulario:
          "mt-4 bg-[var(--brown)] text-white py-2 px-4 rounded hover:opacity-90",
        painel:
          "bg-amber-100 border border-amber-600 text-amber-800 px-4 py-2 rounded-lg hover:bg-amber-300 hover:brightness-100",
        accept:
          "px-6 py-2 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 transition font-semibold text-sm",
        deny: "px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition font-semibold text-sm",
        plus: "p-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition font-semibold text-sm",
      },
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, intent, children, type = "button", ...props}, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(buttonVariants({intent}), className)}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
