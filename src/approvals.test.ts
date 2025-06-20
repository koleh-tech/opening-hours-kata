import { describe, it } from "vitest"
import { Datetime, OpeningHours, Period } from "./OpeningHours"

// TODO: figure out why TS screams about this
// eslint-disable-next-line @typescript-eslint/no-require-imports
const approvals = require("approvals")
approvals.configure({
    reporters: ["kompare"],
})
const approvalDataDir = "approved-behavior"

describe("OpeningHours", function () {
    const days = ["Mon", "Wed", "Fri"]
    const openHours = new OpeningHours(
        days,
        Period.fromStrings("08:00", "16:00"),
    )
    const header = `CONFIG:\nDAYS OPEN: ${days}\nHOURS OPEN: ${"08:00"} - ${"16:00"}\n`

    it("is open on days", function () {
        const timeToTest = "06:29"
        const inputDays = [
            ...[16, 17, 18, 19].map(
                (dayNum) =>
                    new Datetime(`2016-05-${dayNum}T${timeToTest}:11.824Z`),
            ),
        ]
        const result = inputDays
            .map((input) => {
                return `${input.shortDayName()} => ${openHours.isOpenOn(input) ? "OPEN" : "CLOSED"}`
            })
            .join("\n")

        approvals.verify(
            approvalDataDir,
            "open-on-days",
            header +
                `${new Date(
                    `2016-05-16T${timeToTest}:11.824Z`,
                ).toLocaleTimeString()}\n` +
                result,
        )
    })

    it("is open on hours", function () {
        const inputHours = [
            "2016-05-10T22:29:11.824Z",
            "2016-05-10T22:30:11.824Z",
            "2016-05-10T22:31:11.824Z",
            "2016-05-11T06:29:11.824Z",
            "2016-05-11T06:30:11.824Z",
        ].map((input) => new Datetime(input))
        const result = inputHours
            .map((input) => {
                const inputText = `${input.shortDayName()} ${input.time()} (${input.asDate().toUTCString()})`
                return `${inputText} => ${openHours.isOpenOn(input) ? "OPEN" : "CLOSED"}`
            })
            .join("\n")
        approvals.verify("approved-behavior", "open-on-hours", header + result)
    })

    it("next opening day", function () {
        const input = [
            ...[16, 17, 22].map(
                (dayNum) => new Datetime(`2016-05-${dayNum}T12:22:11.824Z`),
            ),
        ]
        const result = input
            .map((input) => {
                const result = openHours.nextOpeningDate(input).toISOString()
                const formattedInput = `${input.asDate().toISOString()} (${input.shortDayName()})`
                return `${formattedInput} => ${result} (${new Datetime(result).shortDayName()})`
            })
            .join("\n")
        approvals.verify(approvalDataDir, "next-opening-day", header + result)
    })
})
