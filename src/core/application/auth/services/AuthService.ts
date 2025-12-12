import bcrypt from "bcrypt";
import { AuthRepository } from "@/core/domain/auth/repository/auth.repository";
import { IUserRepository } from "@/core/domain/user/repository/user.repository";
import {
  type LoginDomainSchemaType,
  loginDomainSchema,
} from "@/core/domain/schmea/login.scema";
import {
  type RegisterDomainSchemaType,
  registerDomainSchema,
} from "@/core/domain/schmea/register.schema";
import { UnauthorizedError } from "@/core/domain/errors/AppError";
import jwt from "jsonwebtoken";

//Ugly
import { UserEntity } from "@/core/domain/user/entity/user.entity";

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async login(dto: LoginDomainSchemaType): Promise<UserEntity | null> {
    const validationDomain = loginDomainSchema.parse(dto);
    const { username, password } = validationDomain;

    const user = await this.userRepository.findUsername(username);

    if (!user) throw new UnauthorizedError();

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedError();
    }

    return user;
  }

  async register(dto: RegisterDomainSchemaType): Promise<UserEntity> {
    const registerDomain = registerDomainSchema.parse(dto);

    const syncSald = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(registerDomain.password, syncSald);

    const registerDto: RegisterDomainSchemaType = {
      ...registerDomain,
      password: hashPassword,
    };

    return await this.authRepository.register(registerDto);
  }
}
