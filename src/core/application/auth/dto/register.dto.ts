import { z } from "zod";
import { usernameValidation } from "../../user/validation/username.validation";
import { passwordValidation } from "../../user/validation/password.validation";

export const registerDto = z
  .object({
    username: usernameValidation,
    email: z
      .email({ message: "Email tidak valid" })
      .min(1, { message: "Email minimal 1 karakter" })
      .max(128, { message: "Email maksimal 128 karakter" }),
    password: passwordValidation,
    confirmPassword: passwordValidation,
    firstName: z
      .string()
      .min(2, { message: "Nama depan minimal 2 karakter" })
      .max(128, { message: "Nama depan maksimal 128 karakter" }),
    lastName: z
      .string()
      .min(2, { message: "Nama belakang minimal 2 karakter" })
      .max(128, { message: "Nama belakang maksimal 128 karakter" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  })
  .transform((data) => {
    const { confirmPassword, ...rest } = data;
    return rest;
  });

export type RegisterDtoType = z.infer<typeof registerDto>;
