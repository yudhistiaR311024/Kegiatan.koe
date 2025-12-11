import { UserEntity } from "../entity/user.entity";
import { CreateUserDtoType } from "@/core/application/user/dto/create-user.dto";
import { UpdateUserDtoType } from "@/core/application/user/dto/update-user.dto";
import { BaseRepository } from "@/core/shared/interfaces/BaseRepository";

export interface IUserRepository
  extends BaseRepository<UserEntity, CreateUserDtoType, UpdateUserDtoType> {
  findUsername(username: string): Promise<UserEntity | null>;
}
