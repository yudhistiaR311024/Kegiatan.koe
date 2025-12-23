import { NextRequest, NextResponse } from "next/server";
import { organizationService } from "@/core/di/container";
import { type UpdateOrganizationDtoType, updateOrganizationDto } from "@/core/application/organization/dto/update-org.dto";
import { handleApiError } from "@/core/utils/handleApiError";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ orgId: string }> }, res: NextResponse): Promise<NextResponse> {
  try {
    const { orgId } = await params
    const updateDTO: UpdateOrganizationDtoType = await req.json()
    const validDTO = updateOrganizationDto.parse(updateDTO)

    const organization = await organizationService.update(orgId, validDTO)

    return NextResponse.json({ success: true, data: organization }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ orgId: string }> }, res: NextResponse): Promise<NextResponse> {
  try {
    const { orgId } = await params

    if (orgId) await organizationService.delete(orgId)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}
