import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(1, { message: 'Username harus diisi' })
  .max(20, { message: "Username maksimal 20 karakter" })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: "Username hanya boleh huruf dan angka, tanpa spasi",
  })
  .trim();

export type UsernameValidationType = z.infer<typeof usernameValidation>;
