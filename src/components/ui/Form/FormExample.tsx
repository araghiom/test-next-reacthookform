import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormInput,
  FormTextarea,
  FormCheckbox,
  FormRadio,
  FormRadioGroup,
  FormCheckboxGroup,
  FormSelect,
  FormDatePicker,
  FormUpload,
} from "./index";

const formSchema = z.object({
  username: z.string().min(3, "نام کاربری باید حداقل 3 کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
  bio: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "باید شرایط را بپذیرید",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "لطفا جنسیت خود را انتخاب کنید",
  }),
  interests: z.array(z.string()).min(1, "حداقل یک علاقمندی انتخاب کنید"),
  country: z.string().min(1, "لطفا کشور خود را انتخاب کنید"),
  birthdate: z.any().optional(),
  avatar: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const FormExample = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      acceptTerms: false,
      interests: [],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  return (
    <div className="max-w-2xl mx-auto p-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">مثال فرم کامل</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <FormInput
                    placeholder="نام کاربری خود را وارد کنید"
                    error={!!form.formState.errors.username}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  این نام کاربری برای همه قابل مشاهده است
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <FormInput
                    type="email"
                    placeholder="example@email.com"
                    error={!!form.formState.errors.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز عبور</FormLabel>
                <FormControl>
                  <FormInput
                    type="password"
                    placeholder="رمز عبور خود را وارد کنید"
                    error={!!form.formState.errors.password}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>بیوگرافی</FormLabel>
                <FormControl>
                  <FormTextarea
                    placeholder="درباره خود بنویسید..."
                    error={!!form.formState.errors.bio}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  حداکثر 500 کاراکتر
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>جنسیت</FormLabel>
                <FormControl>
                  <FormRadioGroup
                    options={[
                      { label: "مرد", value: "male" },
                      { label: "زن", value: "female" },
                      { label: "سایر", value: "other" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!form.formState.errors.gender}
                    orientation="horizontal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>علاقمندی‌ها</FormLabel>
                <FormControl>
                  <FormCheckboxGroup
                    options={[
                      { label: "ورزش", value: "sports" },
                      { label: "موسیقی", value: "music" },
                      { label: "مطالعه", value: "reading" },
                      { label: "سفر", value: "travel" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!form.formState.errors.interests}
                    orientation="vertical"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>کشور</FormLabel>
                <FormControl>
                  <FormSelect
                    options={[
                      { label: "ایران", value: "iran" },
                      { label: "ترکیه", value: "turkey" },
                      { label: "آلمان", value: "germany" },
                      { label: "آمریکا", value: "usa" },
                    ]}
                    placeholder="کشور خود را انتخاب کنید"
                    error={!!form.formState.errors.country}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تاریخ تولد</FormLabel>
                <FormControl>
                  <FormDatePicker
                    value={field.value}
                    onChange={field.onChange}
                    error={!!form.formState.errors.birthdate}
                    placeholder="تاریخ تولد خود را انتخاب کنید"
                    locale="fa"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تصویر پروفایل</FormLabel>
                <FormControl>
                  <FormUpload
                    onChange={field.onChange}
                    error={!!form.formState.errors.avatar}
                    acceptedFormats={[".jpg", ".jpeg", ".png", ".gif"]}
                    maxSize={5 * 1024 * 1024}
                    uploadText="انتخاب تصویر"
                    dragDropText="یا تصویر را اینجا بکشید"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormCheckbox
                    label="شرایط و قوانین را می‌پذیرم"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    error={!!form.formState.errors.acceptTerms}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ثبت فرم
          </button>
        </form>
      </Form>
    </div>
  );
};

export default FormExample;

