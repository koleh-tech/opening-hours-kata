import { describe, it } from "vitest"
import approvals from "approvals"
import { OpeningHours } from "./OpeningHours"

approvals.configure({
    reporters: ["kompare"],
})

describe("OpeningHours", function () {
    it("is open on days", function () {
        const toApprove = new OpeningHours(
            ["mon", "wed", "fri"],
            "08:00",
            "16:00",
        ).isOpenOn("2016-05-11T12:22:11.824Z")
        approvals.verify(
            __dirname,
            "open-on-days",
            toApprove ? "OPEN" : "CLOSED",
        )
    })
})

// def test_is_open_on(shop_hours: OpeningHours):
//     results = {
//         "wednesday": shop_hours.is_open_on("2016-05-11T12:22:11.824Z"),
//         "wednesday_after_hours": shop_hours.is_open_on("2016-05-11T16:01:00.000Z"),
//         "thursday": shop_hours.is_open_on("2016-05-12T12:22:11.824Z"),
//     }
//
//     verify(f"{header_for_hours(shop_hours)}{results}")
//
