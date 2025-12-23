import { IOrganizationRepository } from "@/core/domain/organization/repository/org.repository";
import { CreateOrganizationDtoType } from "../dto/create-org.dto";
import { OrganizationEntity } from "@/core/domain/organization/entitiy/org.entity";
import { UpdateOrganizationDtoType } from "../dto/update-org.dto";

export class OrganizationService {
  constructor(private readonly organizationRepository: IOrganizationRepository) { }

  async create(dto: CreateOrganizationDtoType): Promise<OrganizationEntity> {
    return this.organizationRepository.create(dto)
  }

  async findAll(): Promise<OrganizationEntity[]> {
    return this.organizationRepository.findAll()
  }

  async find(query: { id: string | undefined, slug: string | undefined }): Promise<OrganizationEntity | null> {
    return this.organizationRepository.findOrg(query)
  }

  async update(id: string, dto: UpdateOrganizationDtoType): Promise<OrganizationEntity> {
    return this.organizationRepository.update(id, dto)
  }

  async delete(id: string): Promise<void> {
    await this.organizationRepository.delete(id)
  }
}
