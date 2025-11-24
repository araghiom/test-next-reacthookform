import { forwardRef } from "react";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none  ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        } ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;

