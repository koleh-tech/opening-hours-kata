import { describe, expect, it } from "vitest"
import { Period, Datetime, OpeningHours, Time } from "./OpeningHours"

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

describe("Period", () => {
    it("Configured using local time", () => {
        expect(new Period("08:00", "16:30").formatInLocalTime()).toBe(
            "08:00 am - 04:30 pm",
        )
    })

    describe(".includes", () => {
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

    describe("formatInLocalTime", () => {
        it("Open must be before close", () => {
            expect(() =>
                new Period("08:00", "06:30").formatInLocalTime(),
            ).toThrowError("Store must close after it opens")
        })

        it("Basic", () => {
            expect(new Period("08:00", "23:30").formatInLocalTime()).toBe(
                "08:00 am - 11:30 pm",
            )
        })
    })
})

describe("Time.setTimeOn", () => {
    it("sets morning time", () => {
        const input = new Datetime("2016-05-07T21:01:00.824Z")
        expect(input.toDate().toLocaleString()).toEqual("5/8/2016, 6:31:00 AM")
        const time = new Time(8, 0)
        const result = time.setTimeOn(input).toDate()
        expect(result.toLocaleString()).toEqual("5/8/2016, 8:00:00 AM")
        expect(result.toUTCString()).toEqual("Sat, 07 May 2016 22:30:00 GMT")
    })
})
