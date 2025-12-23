import { Prisma } from "@/generated/prisma/client";
import { handlePrismaError } from "../../utils/handlePrismaError";

import type { Organization } from "@/generated/prisma/client";

export class PrismaOrganizationRepository {
  constructor(private readonly organization: Prisma.OrganizationDelegate) { }

  async findOrg(query: Prisma.OrganizationWhereUniqueInput): Promise<Organization | null> {
    return handlePrismaError(this.organization.findFirst({
      where: {
        OR: [
          { id: query.id },
          { slug: query.slug }
        ]
      },
      include: {
        members: true
      }
    }))
  }

  async findAll(): Promise<Organization[]> {
    return handlePrismaError(this.organization.findMany({ include: { members: true } }))
  }

  async create(dto: Prisma.OrganizationCreateInput): Promise<Organization> {
    return handlePrismaError(this.organization.create({ data: dto }));
  }

  async update(id: string, data: Prisma.OrganizationUpdateInput): Promise<Organization> {
    return handlePrismaError(this.organization.update({ where: { id }, data }));
  }

  async delete(id: string): Promise<void> {
    await handlePrismaError(this.organization.delete({ where: { id } }));
  }
}
