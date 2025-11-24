import { forwardRef } from "react";
import FormCheckbox from "./FormCheckbox";

export interface CheckboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface FormCheckboxGroupProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "value"
  > {
  options: CheckboxOption[];
  error?: boolean;
  orientation?: "horizontal" | "vertical";
  onChange?: (values: (string | number)[]) => void;
  value?: (string | number)[];
}

const FormCheckboxGroup = forwardRef<HTMLDivElement, FormCheckboxGroupProps>(
  (
    {
      options,
      error,
      orientation = "vertical",
      onChange,
      value = [],
      name,
      ...props
    },
    ref
  ) => {
    const handleCheckboxChange = (optionValue: string | number, checked: boolean) => {
      if (!onChange) return;

      if (checked) {
        onChange([...value, optionValue]);
      } else {
        onChange(value.filter((v) => v !== optionValue));
      }
    };

    return (
      <div
        ref={ref}
        className={`flex gap-4 ${
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
        }`}
      >
        {options.map((option) => (
          <FormCheckbox
            key={option.value}
            label={option.label}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
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

FormCheckboxGroup.displayName = "FormCheckboxGroup";

export default FormCheckboxGroup;

