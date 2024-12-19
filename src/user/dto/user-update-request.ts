import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UserUpdateRequest {
  @IsNotEmpty()
  @IsUUID()
  id: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
}
