import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginRequest {
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string
}
