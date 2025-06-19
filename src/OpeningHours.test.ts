import { describe, expect, it } from "vitest"
import { Period, Time, ClosesBeforeOpeningError } from "./OpeningHours"

describe("Period", () => {
    it("Configured using local time", () => {
        expect(Period.fromStrings("08:00", "16:30").formatInLocalTime()).toBe(
            "08:00 am - 04:30 pm",
        )
    })

    // TODO remove this once 'can close in the next day' is working
    it("Opening needs to be before closing", () => {
        expect(() => Period.fromStrings("08:00", "06:30")).toThrowError(
            ClosesBeforeOpeningError,
        )
    })

    describe(".includes", () => {
        it.skip("Hours can go into next day", () => {
            const input = new Date("2016-05-07T06:30:11.824Z")
            expect(Period.fromStrings("22:30", "06:30").includes(input)).toBe(
                true,
            )
        })

        it("Hourly", () => {
            const input = new Date("2016-05-07T21:01:11.824Z")
            expect(Period.fromStrings("06:00", "07:00").includes(input)).toBe(
                true,
            )
        })
    })

    describe("formatInLocalTime", () => {
        it.skip("Can close next day morning", () => {
            expect(
                Period.fromStrings("20:00", "06:30").formatInLocalTime(),
            ).toBe("08:00 pm - 6:30 am (next day)")
        })

        it("Basic", () => {
            expect(
                Period.fromStrings("08:00", "23:30").formatInLocalTime(),
            ).toBe("08:00 am - 11:30 pm")
        })
    })
})

describe("Time.setTimeOn", () => {
    it("sets morning time", () => {
        const input = new Date("2016-05-07T21:01:00.824Z")

        const result = new Time(8, 0).setTimeFor(input).toDate()
        expect(result.toUTCString()).toEqual("Sat, 07 May 2016 22:30:00 GMT")
    })
})
