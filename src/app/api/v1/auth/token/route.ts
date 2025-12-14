import { NextResponse } from "next/server";
import { prisma } from "@/core/infrastructure/databases/prisma/prisma.client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { UnauthorizedError } from "@/core/domain/errors/AppError";
import { handleApiError } from "@/core/utils/handleApiError";

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const refreshToken = cookiesStore.get("refreshToken")?.value;

    if (!refreshToken) throw new UnauthorizedError();

    const userToken = await prisma.refreshToken.findFirst({
      where: {
        token: refreshToken,
      },
    });

    if (!userToken) throw new UnauthorizedError();

    const user = await prisma.user.findFirst({
      where: {
        id: userToken.userId,
      },
    });

    if (!user) throw new UnauthorizedError();

    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    } catch {
      throw new UnauthorizedError();
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "40s",
    });

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
