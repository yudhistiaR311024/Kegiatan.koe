import { authService } from "@/core/di/container";
import { NextResponse, NextRequest } from "next/server";
import { handleApiError } from "@/core/utils/handleApiError";
import { LoginDtoType, loginDTO } from "@/core/application/auth/dto/login.dto";

//ugly
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/core/infrastructure/databases/prisma/prisma.client";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const dto: LoginDtoType = await req.json();
    const validDTO = loginDTO.parse(dto);

    const user = await authService.login(validDTO);

    if (!user) return NextResponse.next();

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "40s",
    });

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

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error: any) {
    return handleApiError(error);
  }
}
