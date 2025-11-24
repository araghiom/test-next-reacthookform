import { z } from "zod";

export const cardsSSGSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
});

export type CardsSSGParams = z.infer<typeof cardsSSGSchema>;

