import { Role } from '../domain/role.enum';

export class UserCreateRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
}
