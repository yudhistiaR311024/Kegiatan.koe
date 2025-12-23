import { z } from "zod";

export const loginDomainSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginDomainSchemaType = z.infer<typeof loginDomainSchema>;
