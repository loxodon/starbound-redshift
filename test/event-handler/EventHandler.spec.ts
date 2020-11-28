import { describe, it } from "mocha"
import { SucceedToHandleEvent } from "./scenarios/SucceedToHandleEvent"

describe("given valid input has been prepared", function () {
  describe("when an event is handled", function () {
    it("should succeed to handle event", async function () {
      let scenario = new SucceedToHandleEvent()
      scenario.prepareDummyEventName()
      scenario.prepareDummyEventArgs()
      scenario.prepareSucceedingHttpRequestServiceStub()
      scenario.prepareUseCaseWithSucceedingHttpRequestServiceStub()

      await scenario.handleEvent()

      scenario.shouldSucceedToHandleEvent()
    })
  })
})
