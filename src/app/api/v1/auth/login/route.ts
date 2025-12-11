import { authService } from "@/core/di/container";
import { NextResponse, NextRequest } from "next/server";
import { handleApiError } from "@/core/utils/handleApiError";
import {
  type LoginDtoType,
  loginDTO,
} from "@/core/application/auth/dto/login.dto";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: LoginDtoType = await req.json();
    const validDTO = loginDTO.parse(dto);

    await authService.login(validDTO);

    return NextResponse.json({ message: "Ok" }, { status: 200 });
  } catch (error: any) {
    return handleApiError(error);
  }
}
