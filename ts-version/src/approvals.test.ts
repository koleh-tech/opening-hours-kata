var approvals = require("approvals")
describe("When running some tests", function () {
    beforeEach(function () {
        this.setOptions({
            reporters: ["meld"],
        })
    })
    it("should be able to use Approvals", function () {
        var data = "Hello World!"
        this.verify(data, { reporters: ["meld"] }) // or this.verifyAsJSON(data)
    })
})
