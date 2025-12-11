import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, { message: "Username minimal 3 karakter" })
  .max(128, { message: "Username maksimal 128 karakter" })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: "Username hanya boleh alphanumeric (huruf dan angka, tanpa spasi)",
  });

export type UsernameValidationType = z.infer<typeof usernameValidation>;
