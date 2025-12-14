import { handleApiError } from "@/core/utils/handleApiError";
import { NextResponse, NextRequest } from "next/server";
import { authService } from "@/core/di/container";

import {
  RegisterDtoType,
  registerDto,
} from "@/core/application/auth/dto/register.dto";

//ugly
import { prisma } from "@/core/infrastructure/databases/prisma/prisma.client";

export async function POST(req: NextRequest) {
  try {
    const dto: RegisterDtoType = await req.json();

    const validDTO = registerDto.parse(dto);

    const user = await authService.register(validDTO);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
      },
    });

    return NextResponse.json({ message: "Ok" }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
