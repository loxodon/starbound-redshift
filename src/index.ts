require("dotenv").config()
let ButtplugBLEManager = require("buttplug-node-bluetoothle-manager")
import { ConfigValidatorFactory } from "./config-validator/ConfigValidator.factory"
import { WatcherFactory } from "./watcher/Watcher.factory"
import { EventHandlerFactory } from "./event-handler/EventHandler.factory"
import {
  ButtplugClient,
  ButtplugEmbeddedClientConnector,
  ButtplugServer,
  TestDeviceImpl,
  TestDeviceSubtypeManager,
} from "buttplug"

;(async function () {
  let bpClient = new ButtplugClient("Generic Buttplug Client")
  let connector = new ButtplugEmbeddedClientConnector()
  connector.Server = new ButtplugServer()
  connector.Server.AddDeviceManager(new TestDeviceSubtypeManager())

  let bpDevice = []
  await bpClient.Connect(connector)

  bpClient.addListener("deviceadded", async (device) => {
    bpDevice.push(device)
    await bpClient.Devices[0].SendVibrateCmd(1.0)
  })

  await bpClient.StartScanning()
  await bpClient.StopScanning()
})()

ConfigValidatorFactory.make()
  .validate()
  .then(() => {
    console.log("watching..")

    WatcherFactory.make().on("line", function (data: string) {
      let metadata = data.match(/\[.*]\s(SXB_EVENT.*)::(.*)::(.*)/)
      if (metadata == null) return

      console.log("EVENT : " + metadata[2] + " => " + metadata[3])

      let eventHandler = EventHandlerFactory.make()
      eventHandler.handleEvent(metadata[2], metadata[3]).catch((reason) => {
        console.error(reason)
      })
    })
  })
  .catch((reason: Error) => {
    console.error(reason.message)
  })
