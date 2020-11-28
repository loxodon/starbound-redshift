import { IEventHandler } from "./EventHandler.interface"
import { EventHandler } from "./EventHandler"
import { HttpRequestService } from "../http/HttpRequestService"

export class EventHandlerFactory {
  public static make(): IEventHandler {
    return new EventHandler(new HttpRequestService())
  }
}
