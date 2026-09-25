interface ServiceEndpoint {
  name: string;
  host: string;
  port: number;
}

class ServiceRegistry {
  private readonly services = new Map<string, ServiceEndpoint>();

  register(service: ServiceEndpoint): void {
    this.services.set(service.name, service);
  }

  discover(name: string): ServiceEndpoint | undefined {
    return this.services.get(name);
  }

  resolveEndpoint(name: string): string | undefined {
    const service = this.discover(name);

    if (!service) {
      return undefined;
    }

    return `http://${service.host}:${service.port}`;
  }
}

export function resolveServiceEndpoint(
  registry: ServiceRegistry,
  serviceName: string
): string | undefined {
  return registry.resolveEndpoint(serviceName);
}

export function solve_16_service_discovery_basics(): string {
  const registry = new ServiceRegistry();

  registry.register({
    name: 'user-service',
    host: 'localhost',
    port: 3001
  });

  registry.register({
    name: 'order-service',
    host: 'localhost',
    port: 3002
  });

  const endpoint = resolveServiceEndpoint(
    registry,
    'user-service'
  );

  return endpoint ?? 'Service not found';
}

export { ServiceRegistry };