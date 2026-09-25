import { EventEmitter } from 'node:events';

interface OrderCreatedEvent {
  orderId: number;
  product: string;
}

class EventProducer {
  private readonly eventBus: EventEmitter;

  constructor(eventBus: EventEmitter) {
    this.eventBus = eventBus;
  }

  createOrder(order: OrderCreatedEvent): void {
    this.eventBus.emit('order.created', order);
  }
}

class EventConsumer {
  private readonly messages: string[] = [];

  handleOrderCreated(order: OrderCreatedEvent): void {
    this.messages.push(
      `Order ${order.orderId} received for ${order.product}`
    );
  }

  getLastMessage(): string {
    return this.messages.at(-1) ?? 'No events received';
  }
}

export function solve_12_rabbitmq_redis_event_driven_flow(): string {
  const eventBus = new EventEmitter();
  const producer = new EventProducer(eventBus);
  const consumer = new EventConsumer();

  eventBus.on(
    'order.created',
    (order: OrderCreatedEvent) => {
      consumer.handleOrderCreated(order);
    }
  );

  producer.createOrder({
    orderId: 101,
    product: 'Laptop'
  });

  return consumer.getLastMessage();
}