import { z } from "zod";

export const createPostSchema = z.object({
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

export type CreatePostData = z.infer<typeof createPostSchema>;

