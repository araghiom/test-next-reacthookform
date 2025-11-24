import { forwardRef } from "react";

export interface FormCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: boolean;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className={`w-5 h-5 rounded border-2 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            error
              ? "border-red-500 text-red-600 focus:ring-red-500"
              : "border-gray-300 text-blue-600 focus:ring-blue-500"
          } ${className || ""}`}
          ref={ref}
          {...props}
        />
        {label && (
          <span className={`text-sm ${error ? "text-red-500" : "text-gray-700"}`}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";

export default FormCheckbox;

