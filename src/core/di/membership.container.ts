//HACK: Perbaiki kemudian
import { PrismaMembershipRepository } from "../infrastructure/repositories/PrismaMembershipRespository"
import { CreateMembershipService } from "../application/membership/services/create.membership.service"
import { GetUserMembershipService } from "../application/membership/services/getUser-Membership.service"

export function membershipRepositoryFactory() {
  return new PrismaMembershipRepository()
}

export function getUserMemebrshipService() {
  return new GetUserMembershipService(membershipRepositoryFactory())
}

export function cretaeMembersipService() {
  return new CreateMembershipService(membershipRepositoryFactory())
}


