require("dotenv").config()
import { ConfigValidatorFactory } from "./config-validator/ConfigValidator.factory"
import { WatcherFactory } from "./watcher/Watcher.factory"
import { EventHandlerFactory } from "./event-handler/EventHandler.factory"
import { LoggingService } from "./logging/LoggingService"

const log = new LoggingService(process.env.LOG_LEVEL)

ConfigValidatorFactory.make()
  .validate()
  .then(() => {
    log.info("watching..")

    WatcherFactory.make().on("line", function (data: string) {
      let regexStatement = new RegExp(
        `\\[.*]\\s(${process.env.EVENTS_PREFIX}.*)::(.*)::(.*)`
      )
      let metadata = data.match(regexStatement)
      if (metadata == null) return

      log.debug("EVENT : " + metadata[2] + " => " + metadata[3])

      let eventHandler = EventHandlerFactory.make()
      eventHandler.handleEvent(metadata[2], metadata[3])
      .then((response) => {
        log.info("API Responded with Status Code: " + JSON.stringify(response.status))
      }).catch((reason) => {
        log.error(reason)
      })
    })
  })
  .catch((reason: Error) => {
    log.error(reason.message)
  })
