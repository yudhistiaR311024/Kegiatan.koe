import { NextRequest, NextResponse } from "next/server";
import { cretaeMembersipService } from "@/core/di/membership.container";
import { type CreateMembershipSchemaType, createMemebrshipSchema } from "@/core/schema/membership.schema";
import { handleApiError } from "@/core/utils/handleApiError";


export async function POST(req: NextRequest): Promise<NextResponse> {
  const service = cretaeMembersipService()

  try {
    const input: CreateMembershipSchemaType = await req.json()
    const validationInput = createMemebrshipSchema.parse(input)
    const m = await service.create(validationInput)
    return NextResponse.json({ success: true, data: m }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }

}
