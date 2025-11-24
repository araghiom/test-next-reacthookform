import { forwardRef } from "react";

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, error, rows = 4, ...props }, ref) => {
    return (
      <textarea
        rows={rows}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none resize-none ${
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

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;

