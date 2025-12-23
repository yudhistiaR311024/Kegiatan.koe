import { NextResponse, NextRequest } from "next/server";
import { handleApiError } from "@/core/utils/handleApiError";
import { getUserMemebrshipService } from "@/core/di/membership.container";

//NOTE: Perbaiki kemudian
export async function GET(_req: NextRequest, { params }: { params: Promise<{ userId: string }> }, _res: NextResponse): Promise<NextResponse> {
  const service = getUserMemebrshipService()

  try {
    const { userId } = await params
    const m = await service.getUserMembership(userId)
    return NextResponse.json({ success: true, data: m }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}
