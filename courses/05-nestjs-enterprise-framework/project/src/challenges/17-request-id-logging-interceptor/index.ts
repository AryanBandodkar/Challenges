interface RequestData {
  headers: {
    'x-request-id'?: string;
  };
}

interface StructuredLog {
  requestId: string;
  message: string;
  timestamp: string;
}

class RequestIdLoggingInterceptor {
  intercept(request: RequestData): StructuredLog {
    const requestId =
      request.headers['x-request-id'] ??
      this.generateRequestId();

    request.headers['x-request-id'] = requestId;

    return {
      requestId,
      message: 'Request processed',
      timestamp: new Date().toISOString()
    };
  }

  private generateRequestId(): string {
    return `req-${Date.now()}`;
  }
}

export function solve_17_request_id_logging_interceptor(): string {
  const interceptor = new RequestIdLoggingInterceptor();

  const request: RequestData = {
    headers: {}
  };

  const log = interceptor.intercept(request);

  return `Request ${log.requestId}: ${log.message}`;
}

export { RequestIdLoggingInterceptor };