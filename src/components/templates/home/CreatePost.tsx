"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormInput,
  FormTextarea,
} from "@/components/ui/Form";
import { createPostRequest } from "@/requests/create-post.request";

const createPostSchema = z.object({
  userId: z
    .number()
    .int()
    .positive("User ID must be a positive number")
    .min(1, "User ID must be at least 1"),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 200 characters"),
  body: z
    .string()
    .min(10, "Body must be at least 10 characters")
    .max(5000, "Body must not exceed 5000 characters"),
});

type CreatePostData = z.infer<typeof createPostSchema>;

export const CreatePost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      userId: 1,
      title: "",
      body: "",
    },
  });

  const onSubmit = async (data: CreatePostData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await createPostRequest(data);
      setSubmitSuccess(true);
      form.reset();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Create New Post</h2>
        </div>
        <div className="card-content">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <FormInput
                        type="number"
                        placeholder="Enter user ID"
                        error={!!form.formState.errors.userId}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <FormInput
                        placeholder="Enter post title"
                        error={!!form.formState.errors.title}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <FormTextarea
                        placeholder="Enter post content"
                        rows={8}
                        error={!!form.formState.errors.body}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {submitSuccess && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Post created successfully!
                  </p>
                </div>
              )}

              {submitError && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {submitError}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating..." : "Create Post"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    form.reset();
                    setSubmitError(null);
                    setSubmitSuccess(false);
                  }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Reset
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

