type EventHandler<T> = (payload: T) => Promise<void> | void;

export class EventBus {
  // handlers groupped by events <event, handlers>
  private handlers: Record<string, EventHandler<any>[]> = {};

  on<T>(event: string, handler: EventHandler<T>) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(handler);
  }

  async emit<T>(event: string, payload: T) {
    const handlers = this.handlers[event] || [];
    await Promise.allSettled(handlers.map((handler) => handler(payload)));
  }
}
