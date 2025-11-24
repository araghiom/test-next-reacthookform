import {
  createContext,
  forwardRef,
  useContext,
  useId,
  cloneElement,
  isValidElement,
} from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={className} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <label
      ref={ref}
      htmlFor={formItemId}
      className={`block text-sm font-medium mb-2 ${
        error
          ? "text-red-500 dark:text-red-400"
          : "text-gray-700 dark:text-gray-300"
      } ${className || ""}`}
      {...props}
    >
      {children}
    </label>
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  if (isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      id: formItemId,
      "aria-describedby": !error
        ? formDescriptionId
        : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
    } as any);
  }

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={`text-xs text-gray-500 mt-1 ${className || ""}`}
      {...props}
    >
      {children}
    </p>
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const errorMessage = error ? String(error?.message) : children;

  if (!errorMessage) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={`text-xs text-red-500 mt-1 ${className || ""}`}
      {...props}
    >
      {errorMessage}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

export { default as FormInput } from "./FormInput";
export { default as FormTextarea } from "./FormTextarea";
export { default as FormCheckbox } from "./FormCheckbox";
export { default as FormRadio } from "./FormRadio";
export { default as FormRadioGroup } from "./FormRadioGroup";
export { default as FormCheckboxGroup } from "./FormCheckboxGroup";
export { default as FormSelect } from "./FormSelect";
export { default as FormDatePicker } from "./FormDatePicker";
export { default as FormUpload } from "./FormUpload";

export type { FormInputProps } from "./FormInput";
export type { FormTextareaProps } from "./FormTextarea";
export type { FormCheckboxProps } from "./FormCheckbox";
export type { FormRadioProps } from "./FormRadio";
export type { FormRadioGroupProps, RadioOption } from "./FormRadioGroup";
export type {
  FormCheckboxGroupProps,
  CheckboxOption,
} from "./FormCheckboxGroup";
export type { FormSelectProps, SelectOption } from "./FormSelect";
export type { FormDatePickerProps } from "./FormDatePicker";
export type { FormUploadProps } from "./FormUpload";
