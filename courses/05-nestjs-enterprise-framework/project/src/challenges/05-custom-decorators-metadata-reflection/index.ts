import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const ROLE_KEY = 'role';

class UserController {
  getAdminData(): string {
    return 'Admin data';
  }
}

const descriptor = Object.getOwnPropertyDescriptor(
  UserController.prototype,
  'getAdminData'
);

if (descriptor) {
  SetMetadata(ROLE_KEY, 'admin')(
    UserController.prototype,
    'getAdminData',
    descriptor
  );
}

export function solve_05_custom_decorators_metadata_reflection(): string {
  const reflector = new Reflector();

  const role = reflector.get<string>(
    ROLE_KEY,
    UserController.prototype.getAdminData
  );

  return `Metadata role: ${role}`;
}