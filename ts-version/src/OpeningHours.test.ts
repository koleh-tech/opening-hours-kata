import { describe, expect, it } from "vitest"
import { Period, Datetime, OpeningHours } from "./OpeningHours"

describe("OpeningHours", () => {
    it("Can be open on all days", () => {
        const input = new Datetime("2016-05-11T06:29:11.824Z")
        expect(input.dayName()).toBe("Wed")

        const openingHours = new OpeningHours(
            ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            new Period("06:20", "07:30"),
        )
        expect(openingHours.isOpenOn(input)).toBe(true)

        expect(
            new Datetime(openingHours.nextOpeningDate(input)).dayName(),
        ).toBe("Thu")
    })
})

describe("Period.includes", () => {
    it.skip("Hours can go into next day", () => {
        const input = new Datetime("2016-05-07T06:30:11.824Z")
        expect(input.dayName()).toBe("Sat")
        expect(new Period("22:30", "06:30").includes(input)).toBe(true)
    })

    it("Hourly", () => {
        const input = new Datetime("2016-05-07T21:01:11.824Z")
        expect(new Period("21:00", "22:00").includes(input)).toBe(true)
    })
})

describe("Period.formatInLocalTime", () => {
    it.skip("Hours can go into next day", () => {
        const input = new Datetime("2016-05-07T06:30:11.824Z")
        expect(input.dayName()).toBe("Sat")
        expect(new Period("22:30", "06:30").includes(input)).toBe(true)
    })

    it("Basic", () => {
        expect(new Period("22:30", "23:00").formatInLocalTime()).toBe(
            "08:00 am - 08:30 am",
        )
    })
})
