import { z } from "zod";

export const registerDomainSchema = z.object({
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

export type RegisterDomainSchemaType = z.infer<typeof registerDomainSchema>;
