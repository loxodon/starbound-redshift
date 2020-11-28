import { Watcher } from "./Watcher"

export class WatcherFactory {
  public static make() {
    const filePath = process.env.starbound_log_file_path
    return new Watcher(filePath)
  }
}
