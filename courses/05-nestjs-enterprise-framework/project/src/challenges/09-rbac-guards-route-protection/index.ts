import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type {
  CanActivate,
  ExecutionContext
} from '@nestjs/common';

type Role = 'admin' | 'user';

const Roles = (...roles: Role[]) =>
  SetMetadata('roles', roles);

class RolesGuard implements CanActivate {
  private readonly reflector: Reflector;

  constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.get<Role[]>(
        'roles',
        context.getHandler()
      ) ?? [];

    if (requiredRoles.length === 0) {
      return true;
    }

    const request: {
      user?: {
        roles?: Role[];
      };
    } = context.switchToHttp().getRequest();

    const userRoles = request.user?.roles ?? [];

    return requiredRoles.some((role) =>
      userRoles.includes(role)
    );
  }
}

class AdminController {
  getAdminData(): string {
    return 'Admin data';
  }
}

const descriptor = Object.getOwnPropertyDescriptor(
  AdminController.prototype,
  'getAdminData'
);

if (descriptor) {
  Roles('admin')(
    AdminController.prototype,
    'getAdminData',
    descriptor
  );
}

export function solve_09_rbac_guards_route_protection(): string {
  return 'RBAC guard and role metadata configured';
}