import { MembershipRepository } from "@/core/domain/membership/repository/membership.repository";
import { CreateMemberDTO } from "../dto/create-member.dto";

export class CreateMembershipService {
  constructor(private repository: MembershipRepository) { }

  create(dto: CreateMemberDTO) {
    return this.repository.create(dto)
  }
}
