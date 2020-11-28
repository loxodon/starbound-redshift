export interface IHttpRequestService {
  post(url: string, data?: any, config?: any): Promise<any>
}
