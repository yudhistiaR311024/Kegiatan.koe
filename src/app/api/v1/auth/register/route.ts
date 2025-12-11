import { handleApiError } from "@/core/utils/handleApiError";
import { NextResponse, NextRequest } from "next/server";
import { authService } from "@/core/di/container";

import {
  type RegisterDtoType,
  registerDto,
} from "@/core/application/auth/dto/register.dto";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: RegisterDtoType = await req.json();

    const validDTO = registerDto.parse(dto);

    await authService.register(validDTO);

    return NextResponse.json({ message: "OK" }, { status: 201 });
  } catch (error: any) {
    return handleApiError(error);
  }
}
