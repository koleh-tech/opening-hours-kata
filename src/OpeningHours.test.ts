import { describe, expect, it } from "vitest"
import { Period, Time, ClosesBeforeOpeningError } from "./OpeningHours"

describe("Period", () => {
    it("Configured using timezone specified by locale", () => {
        const japanTime = "ja-JP"
        expect(
            new Period(
                Time.fromString("08:00"),
                Time.fromString("16:30"),
                japanTime,
            ).formatInLocaleTime(),
        ).toBe("08:00 - 16:30")
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
                Period.fromStrings("20:00", "06:30").formatInLocaleTime(),
            ).toBe("08:00 pm - 6:30 am (next day)")
        })

        it("Basic", () => {
            expect(
                Period.fromStrings("08:00", "23:30").formatInLocaleTime(),
            ).toBe("08:00 am - 11:30 pm")
        })
    })
})
