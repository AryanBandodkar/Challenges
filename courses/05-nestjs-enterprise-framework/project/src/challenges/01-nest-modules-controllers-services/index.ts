import { Controller, Injectable, Module } from '@nestjs/common';

class AppService {
  getMessage(): string {
    return 'Service is working';
  }
}

// @Injectable()
Injectable()(AppService);

class AppController {
  private readonly appService: AppService;

  constructor() {
    this.appService = new AppService();
  }

  getMessage(): string {
    return this.appService.getMessage();
  }
}

// @Controller('app')
Controller('app')(AppController);

class AppModule { }

// @Module(...)
Module({
  controllers: [AppController],
  providers: [AppService]
})(AppModule);

export function solve_01_nest_modules_controllers_services(): string {
  return 'Nest module, controller, and service configured';
}