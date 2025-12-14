import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/core/infrastructure/databases/prisma/prisma.client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { UnauthorizedError } from "@/core/domain/errors/AppError";
import { handleApiError } from "@/core/utils/handleApiError";

export async function GET(req: NextRequest, res: NextResponse) {
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

    const accessToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      (err, decoded) => {
        if (err) throw new UnauthorizedError();

        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        };

        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
          expiresIn: "40s",
        });
      }
    );

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error: any) {
    return handleApiError(error);
  }
}
