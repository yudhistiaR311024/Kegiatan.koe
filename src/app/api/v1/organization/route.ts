import { NextResponse, NextRequest } from "next/server";
import { handleApiError } from "@/core/utils/handleApiError";
import { type CreateOrganizationDtoType, createOrganizationDto } from "@/core/application/organization/dto/create-org.dto";
import { organizationService } from "@/core/di/container";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const createDTO: CreateOrganizationDtoType = await req.json()
    const validDTO = createOrganizationDto.parse(createDTO)

    const organization = await organizationService.create(validDTO)

    return NextResponse.json({ success: true, data: organization }, { status: 200 })
  } catch (err) {
    return handleApiError(err)
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const organization = await organizationService.findAll()
    return NextResponse.json({ success: true, data: organization }, { status: 200 })
  } catch (err) {
    return handleApiError(err)
  }
}

