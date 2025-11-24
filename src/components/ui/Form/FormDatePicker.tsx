import { forwardRef, useState } from "react";
import DatePicker, { DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

export interface FormDatePickerProps {
  value?: DayValue;
  onChange?: (value: DayValue) => void;
  error?: boolean;
  placeholder?: string;
  locale?: "fa" | "en";
  className?: string;
  disabled?: boolean;
}

const FormDatePicker = forwardRef<HTMLDivElement, FormDatePickerProps>(
  (
    {
      value,
      onChange,
      error,
      placeholder = "انتخاب تاریخ",
      locale = "fa",
      className,
      disabled,
    },
    ref
  ) => {
    const [selectedDay, setSelectedDay] = useState<DayValue>(value || null);

    const handleChange = (day: DayValue) => {
      setSelectedDay(day);
      if (onChange) {
        onChange(day);
      }
    };

    return (
      <div ref={ref} className={className}>
        <DatePicker
          value={selectedDay}
          onChange={handleChange}
          locale={locale}
          shouldHighlightWeekends
          inputPlaceholder={placeholder}
          wrapperClassName="w-full"
          inputClassName={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          calendarClassName="shadow-lg"
          disabled={disabled}
        />
      </div>
    );
  }
);

FormDatePicker.displayName = "FormDatePicker";

export default FormDatePicker;

