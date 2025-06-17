import { expect, test } from "vitest"
import { Period, Datetime, OpeningHours } from "./OpeningHours"

test("adds 1 + 2 to equal 3", () => {
    const toApprove = new OpeningHours(
        ["mon", "wed", "fri"],
        new Period("08:00", "16:00"),
    ).isOpenOn(new Datetime("2016-05-11T12:22:11.824Z"))
    expect(toApprove).toBe(false)
})
