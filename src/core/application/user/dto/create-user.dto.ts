import { z } from "zod";
import { passwordValidation } from "../validation/password.validation";
import { usernameValidation } from "../validation/username.validation";
import { userRoleEnum } from "../validation/userRole.validation";

export const createUserDto = z.object({
  externalId: z
    .string()
    .min(1, { message: "External ID minimal 1 karakter" })
    .max(128, { message: "External ID maksimal 128 karakter" })
    .optional(),
  imageUrl: z
    .url({ message: "URL gambar tidak valid" })
    .min(1, { message: "URL gambar minimal 1 karakter" })
    .max(128, { message: "URL gambar maksimal 128 karakter" })
    .optional(),
  username: usernameValidation,
  email: z
    .email({ message: "Email tidak valid" })
    .min(1, { message: "Email minimal 1 karakter" })
    .max(128, { message: "Email maksimal 128 karakter" }),
  fullName: z
    .string()
    .min(3, { message: "Nama lengkap minimal 3 karakter" })
    .max(128, { message: "Nama lengkap maksimal 128 karakter" })
    .optional(),
  firstName: z
    .string()
    .min(2, { message: "Nama depan minimal 2 karakter" })
    .max(128, { message: "Nama depan maksimal 128 karakter" })
    .optional(),
  lastName: z
    .string()
    .min(2, { message: "Nama belakang minimal 2 karakter" })
    .max(128, { message: "Nama belakang maksimal 128 karakter" })
    .optional(),
  password: passwordValidation,
  role: userRoleEnum.default("MEMBER"),
  deleteSelfEnabled: z.boolean().default(true),
  createOrganizationEnabled: z.boolean().default(false),
  createOrganizationsLimit: z
    .number()
    .int()
    .positive({ message: "Limit harus bilangan bulat positif" })
    .optional()
    .default(1),
  hasVerifiedEmailAddress: z.boolean().default(false),
  hasVerifiedPhoneNumber: z.boolean().default(false),
});

export const registerDto = createUserDto.omit({
  externalId: true,
  imageUrl: true,
  role: true,
  deleteSelfEnabled: true,
  createOrganizationEnabled: true,
  createOrganizationsLimit: true,
  hasVerifiedEmailAddress: true,
  hasVerifiedPhoneNumber: true,
});

export type CreateUserDtoType = z.infer<typeof createUserDto>;
