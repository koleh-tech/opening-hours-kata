import { describe, expect, it } from "vitest"
import { Period, Datetime, Time } from "./OpeningHours"

describe("Period", () => {
    it("Configured using local time", () => {
        expect(new Period("08:00", "16:30").formatInLocalTime()).toBe(
            "08:00 am - 04:30 pm",
        )
    })

    it.skip("Can print in local time", () => {
        expect(new Period("08:00", "16:30").formatInLocalTime()).toBe(
            "08:00 am - 04:30 pm",
        )
    })

    describe(".includes", () => {
        it("Hours can go into next day", () => {
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

        const result = new Time(8, 0).setTimeFor(input).toDate()
        expect(result.toUTCString()).toEqual("Sat, 07 May 2016 22:30:00 GMT")
    })
})
