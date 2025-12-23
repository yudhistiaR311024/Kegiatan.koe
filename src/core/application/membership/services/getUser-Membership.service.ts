import { MembershipRepository } from "@/core/domain/membership/repository/membership.repository";

export class GetUserMembershipService {
  constructor(private repository: MembershipRepository) { }

  async getUserMembership(userId: string) {
    return await this.repository.getUserOrgMembership(userId)
  }
}
