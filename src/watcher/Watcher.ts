import { IWatcher } from "./Watcher.interface"

import { Tail } from "tail"

export class Watcher implements IWatcher {
  watcher: Tail

  constructor(filename: string) {
    this.watcher = new Tail(filename, {
      useWatchFile: true,
    })
  }

  public on(eventType: "line", callback: (data: any) => void): void {
    this.watcher.on(eventType, callback)
  }
}
