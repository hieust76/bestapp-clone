import { EventEmitter } from "events";

export interface AppEvent {
  type: "NEW_JOB" | "JOB_CLAIMED" | "NEW_MESSAGE" | "CONTRACT_UPDATE" | "ESCROW_UPDATE";
  recipientUserId?: string; // If undefined, broadcast to all
  data: any;
  timestamp: number;
}

// Global Singleton EventEmitter for Server-Sent Events
class GlobalEventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(200);
  }

  broadcast(event: Omit<AppEvent, "timestamp">) {
    const fullEvent: AppEvent = {
      ...event,
      timestamp: Date.now(),
    };
    console.log(`📡 [EVENT BUS EMIT] ${fullEvent.type}:`, fullEvent.recipientUserId || "GLOBAL");
    this.emit("app_event", fullEvent);
  }
}

// Attach to globalThis to prevent multiple instances during development HMR
const globalForEvents = globalThis as unknown as { eventBus: GlobalEventBus };
export const eventBus = globalForEvents.eventBus || new GlobalEventBus();
if (process.env.NODE_ENV !== "production") globalForEvents.eventBus = eventBus;
