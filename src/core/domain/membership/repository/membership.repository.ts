import { MembershipEntity } from "../entitiy/membership.entitiy";
import { CreateMemberData } from "../types/membership.type";
import { MembershipWithOrg } from "../types/membership.type";

export interface MembershipRepository {
  create(data: CreateMemberData): Promise<MembershipEntity | null>
  getUserOrgMembership(userId: string): Promise<MembershipWithOrg[]>
}
