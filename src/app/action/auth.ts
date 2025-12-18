"use server";

import { z } from "zod";
import { loginDTO } from "@/core/application/auth/dto/login.dto";
import {
  registerDto,
  RegisterDtoType,
} from "@/core/application/auth/dto/register.dto";
import { prisma } from "@/core/infrastructure/databases/prisma/prisma.client";
import { redirect } from "next/navigation";
import { clearRefreshToken, createRefreshToken } from "@/lib/sessions";
import bcrypt from "bcrypt";

export type LoginSate =
  | {
    error?: {
      username?: string[];
      password?: string[];
    };
    message?: string;
  }
  | undefined;

export type RegisterState =
  | {
    error?: {
      username?: string[];
      firstName?: string[];
      lastName?: string[];
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
    };
    success: boolean
    message?: string;
  }
  | undefined;

export async function login(
  state: LoginSate,
  formData: FormData
): Promise<LoginSate> {
  const validationfields = loginDTO.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validationfields.success) {
    return {
      error: z.flattenError(validationfields.error).fieldErrors,
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      username: validationfields.data.username,
    },
  });

  const message = "Username atau password tidak valid";

  if (!user) return { message };
  const match = await bcrypt.compare(
    validationfields.data.password,
    user.password
  );
  if (!match) return { message };

  const payload = {
    userId: user.id as string,
    username: user.username as string,
    email: user.email as string,
    role: user.role as string,
  };

  await createRefreshToken(payload);
  redirect("/dashboard");
}

export async function register(
  state: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const validationFields = registerDto.safeParse({
    username: formData.get("username"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validationFields.success) {
    return {
      success: false,
      error: z.flattenError(validationFields.error).fieldErrors,
    };
  }

  const syncSald = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(
    validationFields.data.password,
    syncSald
  );

  const registerData: RegisterDtoType = {
    ...validationFields.data,
    password: hashPassword,
  };

  const user = await prisma.user.create({
    data: registerData,
  });

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
    },
  });

  return { success: true, message: "Berhasil membuat akun, Silahkan lanjut login" };
}

export async function logout() {
  await clearRefreshToken();
  redirect("/");
}
