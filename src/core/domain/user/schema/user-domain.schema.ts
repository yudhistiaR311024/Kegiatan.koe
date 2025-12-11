import { z } from "zod";

export const UserDomainSchema = z.object({
  username: z.string(),
  email: z.string(),
  fullName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
