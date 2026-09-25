import type { ClientGrpc } from '@nestjs/microservices';
import type { Observable } from 'rxjs';

interface UserRequest {
  id: number;
}

interface UserResponse {
  id: number;
  name: string;
}

interface UserGrpcService {
  getUser(data: UserRequest): Observable<UserResponse>;
}

class RestGrpcBridge {
  private userService?: UserGrpcService;

  connectGrpcClient(client: ClientGrpc): void {
    this.userService =
      client.getService<UserGrpcService>('UserService');
  }

  getGrpcService(): UserGrpcService | undefined {
    return this.userService;
  }
}

export function solve_13_grpc_rest_interservice_bridge(): string {
  const bridge = new RestGrpcBridge();

  return bridge.getGrpcService() === undefined
    ? 'REST to gRPC bridge configured'
    : 'gRPC service connected';
}