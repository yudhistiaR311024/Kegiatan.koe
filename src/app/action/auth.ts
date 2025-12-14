"use server";

import { z } from "zod";
import { loginDTO } from "@/core/application/auth/dto/login.dto";
import {
  registerDto,
  RegisterDtoType,
} from "@/core/application/auth/dto/register.dto";
import { prisma } from "@/core/infrastructure/databases/prisma/prisma.client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type LoginSate =
  | {
      error?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

type RegisterState =
  | {
      error?: {
        username?: string[];
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;

export async function login(
  state: LoginSate,
  formData: FormData
): Promise<LoginSate> {
  const validationfields = loginDTO.safeParse({
    username: formData.get("username") as string,
    password: formData.get("password") as string,
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
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "1d",
  });

  await prisma.refreshToken.update({
    where: {
      userId: user.id,
    },
    data: {
      token: refreshToken,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });

  redirect("/");
}

export async function register(
  state: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const validationFields = registerDto.safeParse({
    username: formData.get("username") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });

  if (!validationFields.success) {
    return {
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

  return { message: "Berhasil membuat akun" };
}
