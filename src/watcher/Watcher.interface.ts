export interface IWatcher {
  on(eventType: "line", callback: (data: any) => void): void
}
