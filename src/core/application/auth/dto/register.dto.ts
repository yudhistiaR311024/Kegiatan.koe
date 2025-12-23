import { z } from "zod";
import { usernameValidation } from "../../user/validation/username.validation";
import { passwordValidation } from "../../user/validation/password.validation";

export const registerDto = z
  .object({
    username: usernameValidation,
    email: z
      .email({ message: "Email tidak valid" })
      .min(1, { message: "Email minimal harus diisi" })
      .max(100, { message: "Email maksimal 100 karakter" })
      .trim(),
    password: passwordValidation,
    confirmPassword: passwordValidation,
    firstName: z
      .string()
      .min(1, { message: "Nama depan harus diisi" })
      .max(20, { message: "Nama depan maksimal 20 karakter" })
      .trim(),
    lastName: z
      .string()
      .min(1, { message: "Nama belakang harus diisi" })
      .max(20, { message: "Nama belakang maksimal 20 karakter" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  })
  .transform((data) => {
    const { confirmPassword, firstName, lastName, ...rest } = data;

    return {
      ...rest,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
    };
  });

export type RegisterDtoType = z.infer<typeof registerDto>;
