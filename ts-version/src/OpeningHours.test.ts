import { describe, expect, it } from "vitest"
import { Period, Datetime, OpeningHours } from "./OpeningHours"

describe("OpeningHours", () => {
    it("Can be open on all days", () => {
        const input = new Datetime("2016-05-11T06:29:11.824Z")
        expect(input.dayName()).toBe("Wed")

        const openingHours = new OpeningHours(
            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            new Period("08:00", "16:00"),
        )
        expect(openingHours.isOpenOn(input)).toBe(true)

        expect(
            new Datetime(openingHours.nextOpeningDate(input)).dayName(),
        ).toBe("Thu")
    })
})
