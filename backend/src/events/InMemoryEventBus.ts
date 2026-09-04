import { EventListener } from './EventListener';
import { IEventBus } from './IEventBus';

export class InMemoryEventBus implements IEventBus {
  private listeners = new Map();
  subscribe(eventName: string, listener: EventListener) {
    const listeners: EventListener[] = this.listeners.get(eventName) || [];

    listeners.push(listener);

    this.listeners.set(eventName, listeners);
  }

  publish(eventName: string, payload: unknown) {
    const listeners = this.listeners.get(eventName) as EventListener[];
    listeners.forEach((listener) => {
      listener.handle(payload);
    });
  }
}
