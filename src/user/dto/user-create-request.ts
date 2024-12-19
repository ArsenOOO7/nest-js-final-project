import { Role } from '../domain/role.enum';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UserCreateRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
