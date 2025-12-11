import { IUserRepository } from "@/core/domain/user/repository/user.repository";
import { UserEntity } from "@/core/domain/user/entity/user.entity";
import { CreateUserDtoType } from "../dto/create-user.dto";
import { UpdateUserDtoType } from "../dto/update-user.dto";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(dto: CreateUserDtoType): Promise<UserEntity> {
    return await this.userRepository.create(dto);
  }

  async update(id: string, dto: UpdateUserDtoType): Promise<UserEntity> {
    return await this.userRepository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
