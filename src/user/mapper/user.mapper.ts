import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { UserResponseDto } from '../dto/user-response-dto';
import { UserUpdateRequest } from '../dto/user-update-request';

@Injectable()
export class UserMapper {
  public asUserResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }

  public asUserResponseDtos(users: User[]): UserResponseDto[] {
    return users.map(this.asUserResponseDto);
  }

  public applyUserUpdateRequest(user: User, request: UserUpdateRequest): void {
    user.email = request.email;
    user.firstName = request.firstName;
    user.lastName = request.lastName;
  }
}
