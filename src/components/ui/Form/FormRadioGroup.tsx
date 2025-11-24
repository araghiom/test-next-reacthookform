import { forwardRef } from "react";
import FormRadio from "./FormRadio";

export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface FormRadioGroupProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  options: RadioOption[];
  error?: boolean;
  orientation?: "horizontal" | "vertical";
  onChange?: (value: string | number) => void;
  value?: string | number;
}

const FormRadioGroup = forwardRef<HTMLDivElement, FormRadioGroupProps>(
  (
    {
      options,
      error,
      orientation = "vertical",
      onChange,
      value,
      name,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`flex gap-4 ${
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
        }`}
      >
        {options.map((option) => (
          <FormRadio
            key={option.value}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => {
              if (onChange) {
                onChange(
                  typeof option.value === "number"
                    ? Number(e.target.value)
                    : e.target.value
                );
              }
            }}
            disabled={option.disabled}
            error={error}
            name={name}
            {...props}
          />
        ))}
      </div>
    );
  }
);

FormRadioGroup.displayName = "FormRadioGroup";

export default FormRadioGroup;

