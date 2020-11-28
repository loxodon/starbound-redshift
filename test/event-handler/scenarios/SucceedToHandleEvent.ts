import { expect } from "chai"

import { EventHandler } from "../../../src/event-handler/EventHandler"
import { IHttpRequestService } from "../../../src/http/HttpRequestService.interface"
import { SucceedingHttpRequestServiceStub } from "../doubles/SucceedingHttpRequestServiceStub"

export class SucceedToHandleEvent {
  private eventName: string
  private eventArgs: any
  private useCase: EventHandler
  private httpService: IHttpRequestService
  private response: any

  prepareDummyEventName() {
    this.eventName = ""
  }

  prepareDummyEventArgs() {
    this.eventArgs = ""
  }

  prepareSucceedingHttpRequestServiceStub() {
    this.httpService = new SucceedingHttpRequestServiceStub()
  }

  prepareUseCaseWithSucceedingHttpRequestServiceStub() {
    this.useCase = new EventHandler(this.httpService)
  }

  async handleEvent() {
    this.response = await this.useCase.handleEvent(
      this.eventName,
      this.eventArgs
    )
  }

  shouldSucceedToHandleEvent() {
    expect(this.response).to.nested.includes({
      message: "42",
    })
  }
}
