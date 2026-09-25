import type {
  ArgumentsHost,
  ExceptionFilter
} from '@nestjs/common';

class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse();

    const status = 500;

    response.status(status).json({
      statusCode: status,
      message: exception instanceof Error
        ? exception.message
        : 'Internal server error'
    });
  }
}

export function solve_04_exception_filter_error_handling(): string {
  return 'Exception filter maps errors to HTTP responses';
}