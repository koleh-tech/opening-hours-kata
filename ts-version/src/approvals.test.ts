import { describe, it } from "vitest"
import approvals from "approvals"

approvals.configure({
    reporters: ["kompare"],
})
describe("When running some tests", function () {
    it("should be able to use Approvals", function () {
        var data = "Hello World!"
        approvals.verify(
            __dirname,
            "sample-approval-test",
            "some text to verify",
        )
    })
})
