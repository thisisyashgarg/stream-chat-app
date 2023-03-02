import React, { forwardRef } from "react";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ className, children, ...rest }, ref) => {
  return (
    <button
      className={`border-2 border-gra-900 bg-blue-600 rounded p-2 w-full text-white font-bold hover:bg-blue-500 focus:bg-blue-400 transition-colors disabled:bg-gray-500 ${className}`}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
