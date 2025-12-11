import { z } from "zod";

const passwordRegex = /^[A-Z]/;
export const passwordValidation = z
  .string()
  .min(8, { message: "Password minimal 8 karakter" })
  .max(128, { message: "Password maksimal 128 karakter" })
  .regex(passwordRegex, {
    message:
      "Password harus mengandung huruf besar, kecil, angka, dan simbol khusus",
  });

export type PasswordValidationType = z.infer<typeof passwordValidation>;
