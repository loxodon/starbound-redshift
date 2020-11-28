import { IEventHandler } from './EventHandler.interface'
import { IHttpRequestService } from '../http/HttpRequestService.interface'

export class EventHandler implements IEventHandler {
  httpRequestService: IHttpRequestService

  public constructor(
    httpRequestService: IHttpRequestService
  ) {
    this.httpRequestService = httpRequestService
  }

  public handleEvent(eventName: string, eventArgs: any): Promise<any> {
    return this.httpRequestService.post(
      `${process.env.api_url}/record`,
      this.buildRequestData(eventName, eventArgs),
      this.buildRequestConfig()
    )
  }

  private buildRequestData(eventName: string, eventArgs: any) {
    return { eventName: eventName, eventArgs: eventArgs }
  }

  private buildRequestConfig() {
    return { headers: { "X-API-KEY": process.env.api_key }}
  }
}