import { expect, test } from "vitest"
import { OpeningHours, OpeningHoursNew } from "./OpeningHours"

test("adds 1 + 2 to equal 3", () => {
    const toApprove = new OpeningHours(
        ["mon", "wed", "fri"],
        "08:00",
        "16:00",
        new OpeningHoursNew("08:00", "16:00"),
    ).isOpenOn("2016-05-11T12:22:11.824Z")
    expect(toApprove).toBe(false)
})
