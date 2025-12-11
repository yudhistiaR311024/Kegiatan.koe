import { z } from "zod";
import { usernameValidation } from "../validation/username.validation";
import { passwordValidation } from "../validation/password.validation";
import { userRoleEnum } from "../validation/userRole.validation";

export const updateUserDto = z.object({
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
  username: usernameValidation.optional(),
  email: z
    .email({ message: "Email tidak valid" })
    .min(1, { message: "Email minimal 1 karakter" })
    .max(128, { message: "Email maksimal 128 karakter" })
    .optional(),
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
  password: passwordValidation.optional(),
  role: userRoleEnum.optional(),
  deleteSelfEnabled: z.boolean().optional(),
  createOrganizationEnabled: z.boolean().optional(),
  createOrganizationsLimit: z
    .number()
    .int()
    .positive({ message: "Limit harus bilangan bulat positif" })
    .optional(),
  hasVerifiedEmailAddress: z.boolean().optional(),
  hasVerifiedPhoneNumber: z.boolean().optional(),
});

export type UpdateUserDtoType = z.infer<typeof updateUserDto>;
