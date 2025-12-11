import { UserEntity } from "../../user/entity/user.entity";
import { RegisterDomainSchemaType } from "../../schmea/register.schema";

export interface AuthRepository {
  login(username: string): Promise<UserEntity | null>;
  register(dto: RegisterDomainSchemaType): Promise<UserEntity>;
}
