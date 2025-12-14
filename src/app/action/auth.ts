'use server'

import { z } from 'zod'
import { loginDTO } from "@/core/application/auth/dto/login.dto"
import { prisma } from "@/core/infrastructure/databases/prisma/prisma.client"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

export type FormState =
  | {
    error?: {
      username?: string[],
      password?: string[]
    },
    message?: string
  }
  | undefined

export async function login(state: FormState, formData: FormData) {
  const validationfields = loginDTO.safeParse({
    username: formData.get('username'),
    password: formData.get('password')
  })

  if (!validationfields.success) {
    return {
      error: z.flattenError(validationfields.error).fieldErrors
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      username: validationfields.data.username
    }
  })

  const message = 'Username atau password tidak valid'

  if (!user) return { message }
  const match = await bcrypt.compare(validationfields.data.password, user.password);
  if (!match) return { message }

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

  redirect('/')
}
