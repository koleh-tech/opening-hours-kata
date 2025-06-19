import { describe, expect, it } from "vitest"
import { Period, ClosesBeforeOpeningError } from "./OpeningHours"

describe("Period", () => {
    // TODO remove this once 'can close in the next day' is working
    it("Opening needs to be before closing", () => {
        expect(() => Period.fromStrings("08:00", "06:30")).toThrowError(
            ClosesBeforeOpeningError,
        )
    })

    describe("includes", () => {
        it.skip("handles closing next day", () => {
            const input = new Date("2016-05-07T06:30:11.824Z")
            expect(Period.fromStrings("22:30", "06:30").includes(input)).toBe(
                true,
            )
        })

        it("on the opening hour", () => {
            const input = new Date("2016-05-07T21:00:11.824Z")
            expect(Period.fromStrings("06:30", "07:00").includes(input)).toBe(
                true,
            )
        })

        it("excludes on the closing hour. GO HOME STAFF!", () => {
            const input = new Date("2016-05-07T22:00:11.824Z")
            expect(Period.fromStrings("06:00", "07:00").includes(input)).toBe(
                false,
            )
        })
    })
})
