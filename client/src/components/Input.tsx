import React, { forwardRef } from "react";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

const Input = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(({ className, ...rest }, ref) => {
  return (
    <input
      className={`py-1 px-2 border border-gray-400  focus:border-blue-500 utline-none rounded w-full ${className}`}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;
