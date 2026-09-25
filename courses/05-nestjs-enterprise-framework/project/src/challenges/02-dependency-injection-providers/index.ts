import { Injectable } from '@nestjs/common';

class MessageService {
  getMessage(): string {
    return 'Dependency injection is working';
  }
}

// @Injectable()
Injectable()(MessageService);

class UserService {
  private readonly messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  getUserMessage(): string {
    return this.messageService.getMessage();
  }
}

// @Injectable()
Injectable()(UserService);

export function solve_02_dependency_injection_providers(): string {
  const messageService = new MessageService();

  // Constructor-based dependency injection
  const userService = new UserService(messageService);

  return userService.getUserMessage();
}