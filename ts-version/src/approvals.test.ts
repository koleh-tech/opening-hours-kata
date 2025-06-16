import { describe, it } from "vitest"
import approvals from "approvals"
import { OpeningHours } from "./OpeningHours"

approvals.configure({
    reporters: ["kompare"],
})

describe("OpeningHours", function () {
    it("is open on days", function () {
        const openHours = new OpeningHours(
            ["mon", "wed", "fri"],
            "08:00",
            "16:00",
        )
        const header = `CONFIG:\nDAYS OPEN: ${["mon", "wed", "fri"]}\n`
        const inputs = [
            "2016-05-09T12:22:11.824Z",
            "2016-05-10T12:22:11.824Z",
            "2016-05-11T12:22:11.824Z",
            `2016-05-${12}T12:22:11.824Z`,
        ]
        const fourth = openHours.dayNameFor(inputs[3])
        // __AUTO_GENERATED_PRINT_VAR_START__
        console.log("(anon)#(anon) fourth: %s", fourth) // __AUTO_GENERATED_PRINT_VAR_END__
        const result = inputs
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
