import { z } from "zod";

const passwordRegex = /^[A-Z]/;
export const passwordValidation = z
  .string()
  .min(8, { message: "Password minimal 8 karakter" })
  .regex(passwordRegex, {
    message:
      "Password harus mengandung huruf besar dan simbol khusus",
  })
  .trim();

export type PasswordValidationType = z.infer<typeof passwordValidation>;
