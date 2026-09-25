import type {
  CanActivate,
  ExecutionContext,
  PipeTransform
} from '@nestjs/common';

class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    return request.user !== undefined;
  }
}

class UppercasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}

export function solve_03_middleware_guards_interceptors_pipes(): string {
  const pipe = new UppercasePipe();

  const result = pipe.transform('hello nest');

  return `Guard and pipe configured: ${result}`;
}