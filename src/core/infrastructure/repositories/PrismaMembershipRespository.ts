import { prisma } from "../databases/prisma/prisma.client";
import { MembershipEntity } from "@/core/domain/membership/entitiy/membership.entitiy";
import { MembershipRepository } from "@/core/domain/membership/repository/membership.repository";
import { handlePrismaError } from "@/core/utils/handlePrismaError";

import { type CreateMemberData, type MembershipWithOrg } from "@/core/domain/membership/types/membership.type";

export class PrismaMembershipRepository implements MembershipRepository {
  async create(data: CreateMemberData): Promise<MembershipEntity | null> {
    const m = await prisma.organizationMember.create({
      data: data
    })

    if (!m) return null

    return new MembershipEntity(m.id, m.userId, m.orgId, m.isBanned, m.joinedAt)
  }

  async getUserOrgMembership(userId: string): Promise<MembershipWithOrg[]> {
    const rows = await handlePrismaError(prisma.organizationMember.findMany({
      where: {
        userId
      },
      include: {
        organization: true
      }
    }))

    return rows.map(row => ({
      membershipId: row.id,
      userId: row.userId,
      orgId: row.orgId,
      orgName: row.organization.name,
      orgImage: row.organization.imageUrl || "",
      isBanned: row.isBanned,
      joinedAt: row.joinedAt
    }))
  }
}


