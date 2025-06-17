import { describe, it } from "vitest"
import approvals from "approvals"
import { Datetime, OpeningHours } from "./OpeningHours"

approvals.configure({
    reporters: ["kompare"],
})

describe("OpeningHours", function () {
    const days = ["Mon", "Wed", "Fri"]
    const openHours = new OpeningHours(days, "08:00", "16:00")
    const header = `CONFIG:\nDAYS OPEN: ${days}\nHOURS OPEN: ${"08:00"} - ${"16:00"}\n`
    it("is open on days", function () {
        const inputDays = [
            ...[16, 17, 18, 19].map(
                (dayNum) => `2016-05-${dayNum}T12:22:11.824Z`,
            ),
        ]
        const result = inputDays
            .map((input) => {
                const inputText = new Datetime(input).dayName()
                return `${inputText} => ${openHours.isOpenOn(input) ? "OPEN" : "CLOSED"}`
            })
            .join("\n")
        approvals.verify(__dirname, "open-on-days", header + result)
    })

    it("is open on hours", function () {
        const inputHours = [
            ...[`2016-05-10T22:29:11.824Z`],
            ...[`2016-05-10T22:30:11.824Z`],
            ...[`2016-05-10T22:31:11.824Z`],
            ...[`2016-05-11T06:29:11.824Z`],
            ...[`2016-05-11T06:30:11.824Z`],
        ]
        const result = inputHours
            .map((input) => {
                const inputText = `${new Datetime(input).dayName()} ${openHours.timeFor(input)}`
                return `${inputText} => ${openHours.isOpenOn(input) ? "OPEN" : "CLOSED"}`
            })
            .join("\n")
        approvals.verify(__dirname, "open-on-hours", header + result)
    })

    it("next opening day", function () {
        const inputDays = [
            ...[16, 17, 22].map((dayNum) => `2016-05-${dayNum}T12:22:11.824Z`),
        ]
        const result = inputDays
            .map((input) => {
                const datetime = new Datetime(input)
                const inputText = `${input} (${datetime.dayName()})`
                const result = openHours.nextOpeningDate(datetime)
                return `${inputText} => ${result} (${new Datetime(result).dayName()})`
            })
            .join("\n")
        approvals.verify(__dirname, "next-opening-day", header + result)
    })
})
