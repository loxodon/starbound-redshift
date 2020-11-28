import { IHttpRequestService } from "../../../src/http/HttpRequestService.interface"

export class SucceedingHttpRequestServiceStub implements IHttpRequestService {
  post(url: string, data?: any, config?: any): Promise<any> {
    return Promise.resolve({
      message: "42",
    })
  }
}
