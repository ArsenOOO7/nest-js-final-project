import { Injectable, CanActivate, ExecutionContext, SetMetadata } from "@nestjs/common";
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const getRequiredRoles = (context) => {
      return Reflect.getMetadata('roles', context.getClass()) || Reflect.getMetadata('roles', context.getHandler());
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const requiredRoles = getRequiredRoles(context);

    return requiredRoles.includes(user.role);
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);