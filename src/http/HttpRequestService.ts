import { IHttpRequestService } from "./HttpRequestService.interface"
import { default as axios } from "axios"

export class HttpRequestService implements IHttpRequestService {
  public post(url: string, data?: any, config?: any): Promise<any> {
    return axios.post(url, data, config)
  }
}
