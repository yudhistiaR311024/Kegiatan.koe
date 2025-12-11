import { z } from "zod";

export const loginDTO = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(128, "Username must be less than 128 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password must be less than 128 characters"),
});

export type LoginDtoType = z.infer<typeof loginDTO>;
