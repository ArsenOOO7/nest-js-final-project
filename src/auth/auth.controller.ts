import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from "./dto/login.request";

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() request: LoginRequest) {
    const user = await this.authService.validateUser(
      request.email,
      request.password,
    );
    return this.authService.login(user);
  }
}
