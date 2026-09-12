import { EventListener } from "./EventListener.js";

export interface IEventBus {
  subscribe: (eventName: string, listener: EventListener) => void;
  publish: (eventName: string, payload: unknown) => void;
}