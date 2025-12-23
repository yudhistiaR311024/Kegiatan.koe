import { BaseRepository } from "@/core/shared/interfaces/BaseRepository";
import { OrganizationEntity } from "../entitiy/org.entity";
import { UpdateOrganizationDtoType } from "@/core/application/organization/dto/update-org.dto";
import { CreateOrganizationDtoType } from "@/core/application/organization/dto/create-org.dto";

export interface IOrganizationRepository
  extends BaseRepository<OrganizationEntity, CreateOrganizationDtoType, UpdateOrganizationDtoType> {
  findOrg: (query: { id: string | undefined, slug: string | undefined }) => Promise<OrganizationEntity | null>
  findAll: () => Promise<OrganizationEntity[]>
}
