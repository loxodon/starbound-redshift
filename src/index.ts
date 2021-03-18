require("dotenv").config()
import { ConfigValidatorFactory } from "./config-validator/ConfigValidator.factory"
import { WatcherFactory } from "./watcher/Watcher.factory"
import { EventHandlerFactory } from "./event-handler/EventHandler.factory"
import { LoggingService } from "./logging/LoggingService"

const log = new LoggingService(process.env.log_level)

ConfigValidatorFactory.make()
  .validate()
  .then(() => {
    log.info("watching..")

    WatcherFactory.make().on("line", function (data: string) {
      let metadata = data.match(/\[.*]\s(REDSHIFT_EVENT.*)::(.*)::(.*)/)
      if (metadata == null) return

      log.debug("EVENT : " + metadata[2] + " => " + metadata[3])

      let eventHandler = EventHandlerFactory.make()
      eventHandler.handleEvent(metadata[2], metadata[3]).catch((reason) => {
        log.error(reason)
      })
    })
  })
  .catch((reason: Error) => {
    log.error(reason.message)
  })
