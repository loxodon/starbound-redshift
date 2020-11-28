export interface IEventHandler {
  handleEvent(eventName: string, eventArgs: any): Promise<any>
}
