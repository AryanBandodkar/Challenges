import {
  IsEmail,
  IsInt,
  IsString,
  Min
} from 'class-validator';

import { ConfigService } from '@nestjs/config';

class CreateUserDto {
  name!: string;
  email!: string;
  age!: number;
}

IsString()(CreateUserDto.prototype, 'name');
IsEmail()(CreateUserDto.prototype, 'email');
IsInt()(CreateUserDto.prototype, 'age');
Min(18)(CreateUserDto.prototype, 'age');

export function solve_07_validation_config_logging(): string {
  const configService = new ConfigService({
    APP_NAME: 'NestValidationApp'
  });

  const appName =
    configService.get<string>('APP_NAME') ?? 'NestValidationApp';

  return `DTO validation and config enabled for ${appName}`;
}