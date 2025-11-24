import { z } from "zod";

export const homePageSchema = z.object({
  title: z.string().default("Home Page"),
  description: z.string().default("Welcome to our Next.js application"),
});

export type HomePageData = z.infer<typeof homePageSchema>;

