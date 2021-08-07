import { Watcher } from "./Watcher"

export class WatcherFactory {
  public static make() {
    const filePath = process.env.STARBOUND_LOG_FILE_PATH
    return new Watcher(filePath)
  }
}
