import { describe, it } from "vitest"
import approvals from "approvals"
import { OpeningHours } from "./OpeningHours"

approvals.configure({
    reporters: ["kompare"],
})

describe("OpeningHours", function () {
    it("is open on days", function () {
        const days = ["mon", "wed", "fri"]
        const openHours = new OpeningHours(days, "08:00", "16:00")
        const header = `CONFIG:\nDAYS OPEN: ${days}\nHOURS OPEN: ${"08:00"} - ${"16:00"}\n`
        const inputDays = [
            ...[16, 17, 18, 19].map(
                (dayNum) => `2016-05-${dayNum}T12:22:11.824Z`,
            ),
        ]
        const result = inputDays
            .map((input) => {
                const openText = openHours.isOpenOn(input) ? "OPEN" : "CLOSED"
                return `${openHours.dayNameFor(input)} => ${openText}`
            })
            .join("\n")
        approvals.verify(__dirname, "open-on-days", header + result)
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
