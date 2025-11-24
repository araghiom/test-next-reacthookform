import { forwardRef, useState, useRef, ChangeEvent } from "react";

export interface FormUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  error?: boolean;
  onChange?: (files: FileList | null) => void;
  maxSize?: number;
  acceptedFormats?: string[];
  showPreview?: boolean;
  uploadText?: string;
  dragDropText?: string;
}

const FormUpload = forwardRef<HTMLInputElement, FormUploadProps>(
  (
    {
      className,
      error,
      onChange,
      maxSize,
      acceptedFormats,
      showPreview = true,
      uploadText = "انتخاب فایل",
      dragDropText = "یا فایل را اینجا بکشید",
      multiple,
      ...props
    },
    ref
  ) => {
    const [preview, setPreview] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFiles = (files: FileList | null): boolean => {
      if (!files || files.length === 0) return false;

      setErrorMessage("");

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (maxSize && file.size > maxSize) {
          setErrorMessage(
            `حجم فایل ${file.name} بیش از حد مجاز است (${(maxSize / 1024 / 1024).toFixed(0)}MB)`
          );
          return false;
        }

        if (acceptedFormats && acceptedFormats.length > 0) {
          const fileExtension = file.name.split(".").pop()?.toLowerCase();
          if (!fileExtension || !acceptedFormats.includes(`.${fileExtension}`)) {
            setErrorMessage(
              `فرمت فایل ${file.name} مجاز نیست. فرمت‌های مجاز: ${acceptedFormats.join(", ")}`
            );
            return false;
          }
        }
      }

      return true;
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!validateFiles(files)) {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }

      if (showPreview && files) {
        const previews: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
              previews.push(reader.result as string);
              if (previews.length === files.length) {
                setPreview(previews);
              }
            };
            reader.readAsDataURL(file);
          }
        }
      }

      if (onChange) {
        onChange(files);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;

      if (!validateFiles(files)) {
        return;
      }

      if (inputRef.current) {
        inputRef.current.files = files;
      }

      if (showPreview && files) {
        const previews: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
              previews.push(reader.result as string);
              if (previews.length === files.length) {
                setPreview(previews);
              }
            };
            reader.readAsDataURL(file);
          }
        }
      }

      if (onChange) {
        onChange(files);
      }
    };

    const handleClearPreview = () => {
      setPreview([]);
      setErrorMessage("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      if (onChange) {
        onChange(null);
      }
    };

    return (
      <div className={className}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              (inputRef as any).current = node;
            }}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple={multiple}
            accept={acceptedFormats?.join(",")}
            {...props}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <svg
              className="w-12 h-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-gray-600 mb-2">{uploadText}</p>
            <p className="text-xs text-gray-400">{dragDropText}</p>
            {acceptedFormats && acceptedFormats.length > 0 && (
              <p className="text-xs text-gray-400 mt-2">
                فرمت‌های مجاز: {acceptedFormats.join(", ")}
              </p>
            )}
            {maxSize && (
              <p className="text-xs text-gray-400 mt-1">
                حداکثر حجم: {(maxSize / 1024 / 1024).toFixed(0)}MB
              </p>
            )}
          </div>
        </div>

        {errorMessage && (
          <p className="text-xs text-red-500 mt-2">{errorMessage}</p>
        )}

        {showPreview && preview.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {preview.map((src, index) => (
              <div key={index} className="relative group">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearPreview();
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FormUpload.displayName = "FormUpload";

export default FormUpload;

