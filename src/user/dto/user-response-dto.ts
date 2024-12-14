import { Role } from '../domain/role.enum';

export class UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}
