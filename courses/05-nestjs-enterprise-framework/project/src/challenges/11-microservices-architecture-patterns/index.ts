import { Module } from '@nestjs/common';

class UserService {
  getUser(): string {
    return 'User service';
  }
}

class OrderService {
  getOrder(): string {
    return 'Order service';
  }
}

class UserModule { }
// @Module({ providers: [UserService], exports: [UserService] })
Module({
  providers: [UserService],
  exports: [UserService]
})(UserModule);

class OrderModule { }
// @Module({ providers: [OrderService], exports: [OrderService] })
Module({
  providers: [OrderService],
  exports: [OrderService]
})(OrderModule);

class MicroservicesModule { }
// @Module({ imports: [UserModule, OrderModule] })
Module({
  imports: [UserModule, OrderModule]
})(MicroservicesModule);

export {
  UserModule,
  OrderModule,
  MicroservicesModule
};

export function solve_11_microservices_architecture_patterns(): string {
  const userService = new UserService();
  const orderService = new OrderService();

  return `${userService.getUser()} communicates with ${orderService.getOrder()}`;
}